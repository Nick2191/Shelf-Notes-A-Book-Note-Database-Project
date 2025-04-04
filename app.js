//~~~~~Initial App Setup~~~~~//

//NPM Import Modules//
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";


//App Configurations//

//Dotenv Config//
dotenv.config();

//Express App Config//
const app = express();
const port = process.env.PORT;

//App Middleware Config//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use((req, res, next) => {
  res.locals.currentRoute = req.path; // Pass the current route to all templates
  next();
});

//Session Config//
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//Passport Config//
app.use(passport.initialize());
app.use(passport.session());

//bcrypt Config//
const saltRounds = 10;

//Database Config//
const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

db.connect();

//~~~~Application Main Functions~~~~//

//Get All Books from Database//
async function getBooks(userId) {
    const data = await db.query(`SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE userid = $1`, [userId]);
    let items = await Promise.all(data.rows.map(async (item) => {
      let formattedDate = new Date(item.date_read).toLocaleDateString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: 'numeric' 
      });

      let imageUrl = `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`;
      let imagePath = `./public/assets/images/${item.isbn}.jpg`;

      
      if (!fs.existsSync(imagePath)) {
        await axios.get(imageUrl, { responseType: 'arraybuffer' })
            .then(response => {
                fs.writeFileSync(imagePath, response.data);
          });
      }

      return {
          isbn: item.isbn, 
          title: item.title, 
          author: item.author, 
          summary: item.summary, 
          notes: item.notes, 
          rating: item.rating, 
          date_read: formattedDate,
          image: `/assets/images/${item.isbn}.jpg`
      };
  }));
  return items;
}

//Get Specific Book from Database//
async function getSpecificBook(isbn, userId) {
  const data = await db.query(`SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE isbn = $1 AND userid = $2`, [isbn, userId]);
  let items = await Promise.all(data.rows.map(async (item) => {
   let formattedDate = new Date(item.date_read).toISOString().slice(0, 10);

    let imageUrl = `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`;
    let imagePath = `./public/assets/images/${item.isbn}.jpg`;

    await axios.get(imageUrl, { responseType: 'arraybuffer' })
        .then(response => {
            fs.writeFileSync(imagePath, response.data);
        });

    return {
        isbn: item.isbn, 
        title: item.title, 
        author: item.author, 
        summary: item.summary, 
        notes: item.notes, 
        rating: item.rating, 
        date_read: formattedDate,
        image: `/assets/images/${item.isbn}.jpg`
    };
}));
return items;
}

//Add New Book to Database//
async function postBook(isbn, title, author, summary, notes, rating, date_read, userid) {
  db.query(`INSERT INTO ${process.env.DB_TABLE_NAME} (isbn, title, author, summary, notes, rating, date_read, userid) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
    [isbn, title, author, summary, notes, rating, date_read, userid]);
}

//Edit Current Book in Database//
async function editBook(isbn, title, author, summary, notes, rating, date_read, userid) {
  db.query(`UPDATE ${process.env.DB_TABLE_NAME} SET title = $1, author = $2, summary = $3, notes = $4, rating = $5, date_read = $6 WHERE isbn = $7 AND userid = $8`,
  [title, author, summary, notes, rating, date_read, isbn, userid]);
}

//~~~Application Routes~~~//

//Login Routes//
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (checkResult.rows.length > 0) {
        req.redirect("/login");
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            const result = await db.query(
              "INSERT INTO users (email, passwordhash) VALUES ($1, $2) RETURNING *",
              [email, hash]
            );
            const user = result.rows[0];
            req.login(user, (err) => {
              console.log("success");
              res.redirect("/books");
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
});

  app.post("/login", passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/login",
  }));

//Main GET Route(Homepage)//
app.get("/books", async (req, res) => {
    if (req.isAuthenticated()) {
      const id = req.user.userid;
      try {
        const books = await getBooks(id);
        books.sort((a, b) => new Date(b.date_read) - new Date(a.date_read));
        res.render("index.ejs", { books: books});
      } catch (error) {
        console.error(error);
        res.status(500).send("Backend Server Error, Error Fetching Books.");
      }
    } else {  
    res.redirect("/login");
   }
});

//GET Books w/ Sorting//
app.get("/sort-books", async (req, res) => {
  if (req.isAuthenticated()) {
  const sortDate = req.query.sortDate;
  const sortRating = req.query.sortRating;
  const id = req.user.userid;
  try {
    const books = await getBooks(id);

    if (sortDate === 'date_read_desc') {
      books.sort((a, b) => new Date(b.date_read) - new Date(a.date_read));
    } else if (sortDate === 'date_read_asc') {
      books.sort((a, b) => new Date(a.date_read) - new Date(b.date_read));
    } 
    
    if (sortRating === 'rating_desc') {
      books.sort((a, b) => b.rating - a.rating);
    } else if (sortRating === 'rating_asc') {
      books.sort((a, b) => a.rating - b.rating);
    }

    if (!sortDate && !sortRating) {
      books.sort((a, b) => new Date(b.date_read) - new Date(a.date_read));
    }

    res.render("index.ejs", { books: books, sortDate: sortDate, sortRating: sortRating });
  } catch (error) {
    console.error(error);
    res.status(500).send("Backend Server Error, Error Sorting Books.");
  }
} else {
  res.redirect("/login");
 }
});


//Add New Book GET Route(Send to addNote Page)//
app.get("/add", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("addNote.ejs");
  } else {
    res.redirect("/login");
  }
});

//Add New Book POST Route(Send to new Book to Database)//
app.post("/addNote", async (req, res) => {
  if (req.isAuthenticated()) {
  const id = req.user.userid;
  const post = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    notes: req.body.notes,
    rating: req.body.rating,
    date_read: req.body.date_read,
  };

  try {
    await postBook(post.isbn, post.title, post.author, post.summary, post.notes, post.rating, post.date_read, id);
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Book Not Found, Please Try Again.");
  }
} else {
  res.redirect("/login");
 }
});


//Edit Book GET Route(Send to editNote Page)//
app.get("/edit/:isbn", async (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.user.userid;
    const isbn = req.params.isbn;
  try {
    const books = await getSpecificBook(isbn, id);
    res.render("editNote.ejs", { book: books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Book Not Found, Please Try Again.");
  }
} else {
  res.redirect("/login");
 }
});


//Edit Book POST Route(Send Changes to Database)//
app.post("/editNote", async (req, res) => {
  if (req.isAuthenticated()) {
  const id = req.user.userid;
  const post = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    notes: req.body.notes,
    rating: req.body.rating,
    date_read: req.body.date_read,
  };

  try {
    await editBook(post.isbn, post.title, post.author, post.summary, post.notes, post.rating, post.date_read, id);
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Updating Book, Please Try Again.");
  }
} else {
  res.redirect("/login");
 }
});

//Delete Book from Database//
app.post("/delete/:isbn", async (req, res) => {
  if (req.isAuthenticated()) {
  const id = req.user.userid;
  const isbn = req.params.isbn;
  try {
    await db.query(`DELETE FROM ${process.env.DB_TABLE_NAME} WHERE isbn = $1 AND userid = $2`, [isbn, id]);
    let imagePath = `./public/assets/images/${req.params.isbn}.jpg`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("error removing the file:", err);
        } else {
          console.log("file removed successfully");
        }
    });
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Deleting Book, Please Try Again.");
  }
} else {
  res.redirect("/login");
 }
});


//Passport Local Authentication//

passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.passwordhash;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//App Listener//
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });