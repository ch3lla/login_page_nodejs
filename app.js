const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mysql2 = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
const session = require('express-session');


const path = require("path");
const publicDir = path.join(__dirname, './public');


app.use(express.static(publicDir));
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  

app.set('view engine', 'hbs')

// Accessing variales from proccess.env
const db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
})

// Connecting to the database
 db.connect((error) => {
    if(error){
        console.log(error);
    } else {
        console.log("MySQL connected!");
    }
})

// Rendering home page
app.get("/", (req, res) => {
    res.render('index');
})

// Route to register page
app.get("/register", (req, res) => {
    res.render('register');
})

// Route to login page
app.get("/login", (req, res) => {
    res.render('login');
})

// Retrives user's form values
app.post("/auth/register", async (req, res) => {
    const { name, email, password, password_confirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) { console.log(err) }
        if (result.length > 0){
            return res.render('register', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm){
            return res.render('register', {
                message: 'Passwords do not match!'
            })
        }
    })

    let hashedPassword = await bcrypt.hash(password, 8)

    db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword}, (err, result) => {
        if(err){
            console.log(err)
        } else {
            return res.render('register', {
                message: 'User registered!'
            })
        }
    })
})

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
  
        // Check if user exists in the database
        if (results.length === 0) {
            return res.status(401).render('login', {
            message: 'Invalid credentials'
        });
    }
  
        const user = results[0];
  
        // Compare the entered password with the hashed password from the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
            // Password is correct, login successful
            req.session.user = user;
            return res.redirect('/home');
        } else {
            // Password is incorrect
            return res.status(401).render('login', {
            message: 'Invalid credentials'
            });
        }
    });
});
  

app.listen(5000, () => {
    console.log("server started on port 5000");
})