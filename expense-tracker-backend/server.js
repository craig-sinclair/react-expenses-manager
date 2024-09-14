const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.port || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json())

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
        res.status(200).json({ message: 'User registered successfully'});
    }
    catch(err){
        console.log(`Error inserting user`, err);
        res.status(500).json({error: `Error inserting user`});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});