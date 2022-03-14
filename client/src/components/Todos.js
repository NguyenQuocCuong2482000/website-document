import React, {Fragment, useState} from "react"
import TodoItem from './TodoItem'
import AddTodo from "./AddTodo"

import { v4 as uuidv4 } from 'uuid'

const Todos = () => {
    const [todosState, setTodosState] = useState([
        //setTodosState là caí hàm dùng để thay đổi trạng thái của todoState
        {
            id: uuidv4(),
            title: '7h dậy tập thể dục',
            completed: false
        },

        {
            id: uuidv4(),
            title: '8h ăn sáng',
            completed: false
        },

        {
            id: uuidv4(),
            title: '9h học kiến thức IT mới',
            completed: false
        },

        {
            id: uuidv4(),
            title: '12h ăn cơm chưa',
            completed: false
        },

        {
            id: uuidv4(),
            title: '13h đi ngủ',
            completed: false
        },

        {
            id: uuidv4(),
            title: '14h học kiến thức chuyên môn về MERN',
            completed: false
        },

        {
            id: uuidv4(),
            title: '16h chơi game hoặc lướt tiktok',
            completed: false
        },

        {
            id: uuidv4(),
            title: '17h30 đi tắm',
            completed: false
        },

        {
            id: uuidv4(),
            title: '18h ăn cơm tối',
            completed: false
        },

        {
            id: uuidv4(),
            title: '19h đi dạo phố',
            completed: false
        },

        {
            id: uuidv4(),
            title: '20h đi nhậu cùng bạn',
            completed: false
        },

        {
            id: uuidv4(),
            title: '22h về nhà',
            completed: false
        },

        {
            id: uuidv4(),
            title: '23h đi ngủ',
            completed: false
        },
    ])

    const markComplete = id => {
        const newTodos = todosState.map(todo => {
            if (todo.id === id) todo.completed = !todo.completed
            return todo
        })

        setTodosState(newTodos)
    }

    const deleteTodo = id => {
        const newTodos = todosState.filter(todo => todo.id !== id)
        setTodosState(newTodos)
    }

    const addTodo = title => {
        const newTodos = [
            ...todosState,
            {
                id: uuidv4(),
                title,
                completed: false
            }
        ]
        setTodosState(newTodos)
    }



     return (  
        <Fragment>
            <AddTodo addTodoFunc={addTodo} />
            {todosState.map(todo => {
                return (
                <TodoItem 
                    key={todo.id}
                    todoProps={todo} 
                    markCompleteFunc={markComplete}
                    deleteTodoFunc={deleteTodo}
                />  
                
                )
            })} 
        </Fragment>
     )//Props thông tin được truyền giữa các components
}

export default Todos