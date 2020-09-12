const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//initialize dotenv
dotenv.config({path: './config.env'});
const pool = require('./db');
const app = express();
//middleware
app.use(cors());
app.use(express.json());

app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *',
            [description]
        );
        res.status(200).json({success: true, msg: newTodo});
    } catch (err) {
        console.error(err.message);
    }
});

app.listen('5000', () => {
    console.log(`Server has started on PORT 5000`);
});
