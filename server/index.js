const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'loginsystem'
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     if (err) {
    //         console.log(err);
    //     }

    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    );
});
// });

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?;",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
                // bcrypt.compare(password, result[0].password, (error, response) => {
                //     if (response) {
                //         req.session.user = result;
                //         console.log(req.session.user);
                //         res.send(result);
                //     } else {
                //         res.send({ message: "Wrong username/password combination!" });
                //     }
                // });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    );
});


// app.get('/', (req, res) => {

//     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Ramayana', 'GOAT'); ";

//     db.query(sqlInsert, (err, result) => {
//         res.send("Inserted");
//     });
// });

app.listen(3001, () => {
    console.log("Server Running! on port 3001");
});