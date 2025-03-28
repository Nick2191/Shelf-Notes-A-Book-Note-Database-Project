--Shelf-Notes!--
This app is a capstone project I completed for Angela Yu's Full-Stack 2024 WebDev course. The goal was to make an application to Create, Read, Update, and Delete book note entries from a database. This app does just that and adds a fun way to view/edit the notes added to the application. 


--Shelf-Notes App Setup----

Before you can use the app you will need to create an PostgreSQL database and table with the following columns, (isbn, title, author, summary, notes, rating, date_read). Please use the queries.sql file for the exact SET DateStyle and CREATE TABLE commands used in set up. You can also see the sample Book Note INSERT INTO command if you wish to start with that. 

Next you will need to import your environment variables into a .env file you create. Environment variables include Port #, Database username, host, database name, database password, database port, and database table name. Use the included .env.example file as a guide. 

As always the first thing you should do when working on a new project is run "npm i" in your terminal to install the following packages, express, body-parser, pg, dotenv, and axios. 

The styling of this project uses Bootstrap and some minimal custom css for animations and such. To update color palette use the custom.scss file to update colors. Use custom.css to add any custom stylings you wish. 

client.js is used for custom JavaScript to enable the search bar and dark mode. Additional client-side JS should be added there. 

If making changes using Bootstrap classes please run the custom script "npm run sass" which is defined in package.json. This will compile the Bootstrap scss to your style.css file. 

To run the application open a terminal and run the following command, "node app.js"

Enjoy, welcome to feedback and suggestions. 




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