import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Dropdown, DropdownButton, Table } from 'react-bootstrap';

const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const[select,setSelect]=useState("A");
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((getData)=>{
            setTodoList(getData.data)
        })
    })
    const inEvent =(e)=>{
        setSelect(e);
    }
    return(
    <div>
        <h1 className = "text-center">Todo List</h1>
        <Container>
            <div>
            <DropdownButton onSelect={inEvent} id="dropdown-basic-button" title="Todo Filter">
                <Dropdown.Item eventKey="A">All</Dropdown.Item>
                <Dropdown.Item eventKey="P">Pending</Dropdown.Item>
                <Dropdown.Item eventKey="C">Completed</Dropdown.Item>
            </DropdownButton>       
            </div>
            <br/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList
                        .filter(row => select == 'C' ? 
                        row.completed == true : select == 'P' ? 
                        row.completed == false : true)
                        .map((todo, index)=>{
                            return (
                            <tr key = {index}>
                                <td>{todo.userId}</td>   
                                <td>{todo.id}</td>   
                                <td>{todo.title}</td>   
                                <td>{todo.completed ? "true" : "false"}</td>   
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    </div>
    )
}
export default Todo;


