import React from 'react'
import PropTypes from 'prop-types'


const TodoItem = props => {
    const todo = props.todoProps
    const markComplete = props.markCompleteFunc // markComplete này đặt tên gì cũng dc
    const deleteTodo = props.deleteTodoFunc


    //style   : lưu ý style ở đây khác trong css nha
    //nó ko có dấu - và phải để trong '' thành dạng chuỗi
    const todoItemStyle = {
        background: '#f4f4f4',
        padding: '10px',
        borderBottom: '1px #ccc dotted',
        textDecoration: todo.completed ? 'line-through' : 'none',
        marginBottom: '0px',
        

    }

    const deleteButtonStyle = {
        background: '#0066FF',
        color: '#fff',
        border: 'none',
        padding: '5px 9px',
        borderRadius: '50%',
        cursor: 'pointer',
        float: 'right',
    }


    //return
    // Return
  return (
    <p style={todoItemStyle}>
      <input
        type='checkbox'
        onChange={markComplete.bind(this, todo.id)}
        checked={todo.completed}
      />
      {todo.title}
      <button
        style={deleteButtonStyle}
        onClick={deleteTodo.bind(this, todo.id)}
      >
        Delete
      </button>
    </p>
  )
}


//PropTypes kiếm lỗi sẽ dễ hơn
TodoItem.propTypes =  {
    todoProps: PropTypes.object.isRequired,
    markCompleteFunc: PropTypes.func.isRequired,
    deleteTodoFunc:  PropTypes.func.isRequired
}

export default TodoItem