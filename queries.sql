--DATABASE SET UP NOTES--
-----------------------------
--DATABASE NAME = "booknotes"
--TABLE NAME = "books"

--TABLE STRUCTURE Notes--
-----------------------------
--ISBN INTEGER NOT NULL UNIQUE,
--title TEXT NOT NULL,
--Author: TEXT NOT NULL,
--Date_read: DateStyle (MDY) NOT NULL,
--Summary: TEXT NOT NULL
--Notes: TEXT NOT NULL
--Rating: INTEGER NOT NULL CHECK 1 <= Rating <=5


-- Set the DateStyle to MDY
SET DateStyle = 'ISO, MDY';

-- Create the books table
CREATE TABLE books (
    isbn BIGINT NOT NULL UNIQUE PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    summary TEXT NOT NULL,
    notes TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    date_read DATE NOT NULL
);

--Insert First Book Entry
INSERT INTO books (isbn, title, author, summary, notes, rating, date_read)
VALUES (9780553381689, 'Game of Thrones', 'George R.R. Martin', 'A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award.', 'First book entered into database, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', 5, 'April 20, 2009');

--Create Users Table
CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  passwordhash VARCHAR(255) NOT NULL
);