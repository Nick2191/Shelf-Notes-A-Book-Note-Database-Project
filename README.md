# 📚 Shelf-Notes

A full-stack application for managing your personal book notes and ratings.

![License](https://img.shields.io/badge/license-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4.17+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v13+-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.0-purple)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Overview

Shelf-Notes is a capstone project completed as part of Angela Yu's Full-Stack 2024 Web Development course. The application allows users to Create, Read, Update, and Delete book note entries stored in a PostgreSQL database, providing a fun and interactive way to manage your personal book notes.

The inspiration for this project came from Derek Sivers' [book notes website](https://sive.rs/book), which showcases non-fiction books with notes, ratings, and reading dates.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **CRUD Operations**: Add, edit, and delete book notes with ease
- **Rating System**: Rate books using an interactive 5-star rating system
- **Sorting & Filtering**: Sort and filter books by rating, recency, or title
- **Dark Mode**: Toggle between light and dark themes for better user experience
- **Responsive Design**: Bootstrap 5 implementation for seamless use across devices
- **API Integration**: Uses Open Library Covers API to fetch book covers

## 🖼️ Demo

![Demo Screenshot of Shelf-Notes App](/public/assets/images/Finished%20App%20Screenshot.png)

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5, EJS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Passport.js, bcrypt
- **API**: Axios for HTTP requests
- **Other**: SCSS for styling, express-session for session management

## 🚀 Setup Instructions

### Database Setup

1. Create a PostgreSQL database named `booknotes`
2. Create a table titled `books` with the following columns:
   ```sql
   CREATE TABLE books (
     isbn VARCHAR(20),
     title VARCHAR(100) NOT NULL,
     author VARCHAR(100) NOT NULL,
     summary TEXT,
     notes TEXT,
     rating INTEGER,
     date_read DATE
   );
   ```
3. Create a table named `users` with the following columns:
   ```sql
   CREATE TABLE users (
     userid SERIAL PRIMARY KEY,
     email VARCHAR(100) UNIQUE NOT NULL,
     passwordhash VARCHAR(100) NOT NULL
   );
   ```
4. Use the provided `queries.sql` file for the exact SQL commands and optional sample data

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=booknotes
DB_PASSWORD=your_postgres_password
DB_PORT=5432
DB_TABLE=books
SESSION_SECRET=your_session_secret
```

Use the included `.env.example` file as a guide.

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/shelf-notes.git
   cd shelf-notes
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Required packages:
   - express
   - express-session
   - body-parser
   - pg
   - dotenv
   - axios
   - fs
   - bcrypt
   - passport
   - passport-local

### Running the Application

1. Start the server
   ```bash
   npm start
   ```
   or for development:
   ```bash
   nodemon app.js
   ```

2. Open your browser and navigate to `http://localhost:3000` (or the port specified in your `.env` file)

## 📁 Project Structure

```
shelf-notes/
├── app.js                # Main application file
├── queries.sql           # SQL queries for database setup
├── package.json          # Project dependencies
├── .env                  # Environment variables (create this)
├── .env.example          # Example environment variables
├── public/               # Static files
│   ├── styles/           # CSS files
│   │   ├── style.css     # Compiled CSS
│   │   └── custom.css    # Custom CSS overrides
│   ├── assets/           # Images and other assets
│   └── client.js         # Client-side JavaScript
├── scss/                 # SCSS source files
│   └── custom.scss       # Custom SCSS for Bootstrap
├── views/                # EJS templates
│   ├── partials/         # Reusable template parts
│   │   ├── header.ejs    # Header template
│   │   └── footer.ejs    # Footer template
│   ├── index.ejs         # Home page
│   ├── login.ejs         # Login page
│   ├── register.ejs      # Registration page
│   ├── home.ejs          # User dashboard
│   ├── addNote.ejs       # Add note form
│   └── editNote.ejs      # Edit note form
└── node_modules/         # Installed packages
```

## 🎨 Customization

### Styling

- The project uses Bootstrap 5 for styling, along with custom CSS
- To update the color palette, modify the `custom.scss` file
- Add additional custom styles to the `custom.css` file

### Compiling SCSS

If you make changes to the SCSS files, compile them into CSS:

```bash
sass scss/custom.scss public/styles/style.css
```

## 🔌 API Integration

The application uses the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) to fetch book covers. The API is integrated using Axios for HTTP requests.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built by [Nick Kottis](https://github.com/Nick2191)
