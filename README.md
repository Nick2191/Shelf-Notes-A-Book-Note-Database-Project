
--Shelf-Notes--

Shelf-Notes is a capstone project I completed as part of Angela Yu's Full-Stack 2024 Web Development course. The goal of this project was to create a full-stack application that allows users to Create, Read, Update, and Delete book note entries stored in a PostgreSQL database. This application provides a fun and interactive way to manage and edit your personal book notes.

--Features--
Add, edit, and delete book notes with ease.
Rate books using an interactive 5-star rating system.
Sort and filter books by rating, recency, or title.
Dark mode toggle for a better user experience.
Responsive design using Bootstrap 5 for seamless use across devices.

--Setup Instructions--
Follow these steps to set up and run the Shelf-Notes application:

1. Database Setup
Create a PostgreSQL database with the following columns:
isbn, title, author, summary, notes, rating, date_read.
Use the provided queries.sql file for the exact SET DateStyle and CREATE TABLE commands.
Optionally, use the sample INSERT INTO command in the queries.sql file to populate the database with initial data.

2. Environment Variables
Create a .env file in the root directory of the project.
Add the following environment variables:
PORT: The port number for the server.
DB_USER: Your PostgreSQL username.
DB_HOST: The host of your PostgreSQL database.
DB_NAME: The name of your PostgreSQL database.
DB_PASSWORD: Your PostgreSQL password.
DB_PORT: The port number for your PostgreSQL database.
DB_TABLE: The name of the table used for storing book notes.
Use the included .env.example file as a guide.

3. Install Dependencies
Run the following command in your terminal to install the required packages:
Required packages include:
express
body-parser
pg
dotenv
axios

4. Styling
The project uses Bootstrap 5 for styling, along with custom CSS for animations and additional styles.
To update the color palette, modify the custom.scss file.
Add any additional custom styles to the custom.css file.

5. JavaScript
The client.js file contains custom JavaScript for features like the search bar and dark mode toggle.
Add any additional client-side JavaScript functionality to this file.

6. Compile SCSS
If you make changes to the SCSS files, run the following command to compile them into CSS:
This will compile the SCSS into the style.css file.

7. Run the Application
Start the server by running the following command:
Open your browser and navigate to http://localhost:<PORT> (replace <PORT> with the value in your .env file).
Feedback and Suggestions
Feel free to provide feedback or suggestions for improving the application. Contributions are welcome!




---Project Overview and Guidelines---

I read a lot of books but after I finish reading them I often don't remember all the most salient parts of the book. So I started taking notes. This capstone project is built on this idea. My friend Derek Sivers has this fantastic website where he has all the non-fiction books he has read, his notes, his ratings and when he read them. The books are sortable by rating, recency and title. It's a such cool idea for a project so I'm including it as a capstone here in this course.
Objectives

    Revise how to integrate public APIs into web projects.
    Gain more experience using Express/Node.js for server-side programming.
    Demonstrate ability to Create Read Update and Delete data in a PostgreSQL Database to persist data. 

Example Ideas

    Use the Open Library Covers API to fetch book covers.
    Create a database to store books you have read.
    Have a way to add new data about books, update previous reviews and delete entries.
    Display this information from your database in a website like https://sive.rs/book
    Be able to sort your book entries by rating and recency.

Requirements
1. Database Persistance

    Persist data using a PostgreSQL database.
    Use CRUD methods to manipulate data in the database.

2. Project Planning

    Think through your project, researching the API documentation, project features, what data you will store, and how it will be used in your web application.
    Draw a database diagram on draw.io and plan out any relationships.
    Think through the PostgreSQL command you will need to write to create the schema for your database. 

3. Project Setup

    Set up a new Node.js project using Express.js.
    Include pg for working with your localhost PostgreSQL database.
    Include EJS for templating.
    Create a frontend in HTML CSS JS.
    Ensure that the project has a structured directory and file organization.

4. API Integration

    Implement at least a GET endpoint to interact with your chosen API.
    Use Axios to send HTTP requests to the API and handle responses.

5. Data Presentation

    Design the application to present the book covers from the API and the data in your database a in a user-friendly way.
    Use appropriate HTML, CSS, and a templating engine like EJS.
    Think about how you would allow the user to sort the data from the database. 

6. Error Handling

    Ensure that error handling is in place for both your application and any API requests. You can console log any errors, but you can also give users any user-relevant errors. 

7. Documentation

    Include comments throughout your code to explain your logic.

8. Code Sharing

    Use what you have learnt about GitHub to commit and push your project to GitHub so that you can share it with other students in the Q&A area, I'd love to see what you've build too! You can tweet at me @yu_angela
    Include a Readme.md file that explains how to start your server, what commands are needed to run your code. e.g. npm i  and then nodemon index.js

Recommended Resources

    Express.js: Getting Started Guide
    Node.js: Documentation
    Axios: Documentation
    Postgres: Documentation
    pg: Documentation
    Open Library Covers API:  https://openlibrary.org/dev/docs/api/covers