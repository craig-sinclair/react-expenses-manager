const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.port || 5000;
require('dotenv').config();

app.use(cors());

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});