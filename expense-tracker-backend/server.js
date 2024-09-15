const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.port || 5000;
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


let pool;
try{
    pool = new Pool({
        user: 'admin_user',
        host: 'localhost',
        database: 'expenses',
        
        password: process.env.PG_PASSWORD,
        port: 5432,
    });

    pool.connect((err, client, release) => {
        if(err){
            console.log(`An error occurred while connecting to db`, err);
        }
        else{
            console.log('Successfully connected to db');
            release();
        }
    });
}

catch(err){
    console.log(`An error occurred while connecting to db`, err);
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Generate JWT for user
const generateToken = (user) => {
    return jwt.sign({username: user.username}, JWT_SECRET, {expiresIn: '1h'});
};

// Authenticate requests (verify JWT from cookies) -- acting as middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.sendStatus(403); //403 error thrown for no token (or invalid token)

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// SLECT * FROM expenses (table of all expenses)
app.get('/api/expenses', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM expenses;');
        res.json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error'});
    }
});

//Register a new user (INSERT into users)
app.post('/api/register', async (req, res) => {
    const { email, username, budget, password } = req.body;

    try{
        const result = await pool.query(
            `CALL insert_user($1, $2, $3, $4)`, 
            [email, username, budget, password]
        );

        const token = generateToken({ username }); //Generate JWT on registration of a new user

        //Send a JWT in a HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'Strict',
            maxAge: 3600000 //1 hour expirary
        });
        res.status(200).json({ message: 'User registered successfully'});
    }
    catch(err){
        console.log(`Error inserting user`, err);
        res.status(500).json({error: `Error inserting user`});
    }
});

app.get('/api/user', authenticateToken, (req, res) => {
    res.json({ message: `Hello ${req.user.username}` });
});

//Check authentication status- return user info as well (username)
app.get('/api/check-auth', authenticateToken, (req, res) => {
    res.json({ loggedIn: true, username: req.user.username });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});