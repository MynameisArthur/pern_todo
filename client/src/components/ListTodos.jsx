import React, {useEffect, useState} from 'react';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const loadTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const data = await response.json();
            setTodos(data.msg.rows);
        } catch (err) {
            console.error(err);
        }
    };
    useState(() => {
        loadTodos();
    }, []);
    return (
        <>
            {' '}
            <table className='table mt-5 text-center'>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>EDIT</td>
                            <td>DELETE</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ListTodos;
