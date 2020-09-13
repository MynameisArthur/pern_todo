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
        res.status(200).json({success: true, msg: newTodo.rows[0]});
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todo');
        res.status(200).json({success: true, msg: todos});
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id=$1', [
            req.params.id,
        ]);
        res.status(200).json({success: true, msg: todo});
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const {description} = req.body;
        const todo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
            [description, req.params.id]
        );
        res.status(200).json({
            success: true,
            data: {msg: 'todo updated', todo},
        });
    } catch (err) {
        console.error(err.message);
    }
});
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1',
            [id]
        );
        res.status(200).json({
            success: true,
            data: {msg: 'todo removed', deleteTodo},
        });
    } catch (err) {
        console.error(err);
    }
});

app.listen('5000', () => {
    console.log(`Server has started on PORT 5000`);
});
