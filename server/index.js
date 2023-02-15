const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cruddatabase'
});

app.get('/', (req, res) => {

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Ramayana', 'GOAT'); ";

    db.query(sqlInsert, (err, result) => {
        res.send("Inserted");
    });
});

app.listen(3001, () => {
    console.log("Server Running! on port 3001");
});