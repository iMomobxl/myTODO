import React, { useState, useEffect } from 'react'
import './App.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCheckBox } from "react-icons/md";


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  const [allTodos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [completedTodos, setCompletedTodos] = useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodos]
    updatedTodoArr.push(newTodoItem)
    setTodos(updatedTodoArr)
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  }

  const handleDeleteTodo = (index) => {
    let newTodoList = [...allTodos]
    newTodoList.splice(index, 1)

    localStorage.setItem('todolist', JSON.stringify(newTodoList))
    setTodos(newTodoList)
  }

  const handleComplete = (index) => {
    let now = new Date()
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    let hour = now.getHours()
    let min = now.getMinutes()
    let sec = now.getSeconds()
    let completedOn = `${day}/${month}/${year} at ${hour}:${min}:${sec}`

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr)
    handleDeleteTodo(index)
    localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr))
  }

  const handleDeleteCompletedTodo = (index) => {
    let newTodoList = [...completedTodos]
    newTodoList.splice(index, 1)

    localStorage.setItem('completedTodo', JSON.stringify(newTodoList))
    setCompletedTodos(newTodoList)
  }

  useEffect( () => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'))
    if (savedTodo) {
      setTodos(savedTodo)
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo)
    }
  }, [])

  return (
    <div className="App">
      <h1>TODO app</h1>
      <div className="todo-wrapper">

        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input 
              type="text" 
              value={ newTitle }
              onChange={ (elem) => setNewTitle(elem.target.value) }
              placeholder="What's the task title?" 
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input 
              type="text" 
              value={ newDescription }
              onChange={ (elem) => setNewDescription(elem.target.value) }
              placeholder="What's the task description?" 
            />
          </div>
          <div className="todo-input-item">
            <button 
              type="button" 
              onClick={ handleAddTodo }
              className="primaryBtn">
                Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button 
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen (false)}
          >
            TODO
          </button>
          <button 
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen (true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          
            {isCompleteScreen === false && allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={ index }>
                  <div>
                    <h3>{ item.title }</h3>
                    <p>{ item.description }</p>
                  </div>
                  <div>
                    <RiDeleteBin6Line 
                      className="icon" 
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />
                    <MdCheckBox 
                      className="check-icon" 
                      onClick={() => handleComplete(index)}
                      title="Complete?"
                    />
                  </div>
                </div>
              )
            })}

            {isCompleteScreen === true && completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={ index }>
                  <div>
                    <h3>{ item.title }</h3>
                    <p>{ item.description }</p>
                    <p>Completed on: { item.completedOn }</p>
                  </div>
                  <div>
                    <RiDeleteBin6Line 
                      className="icon" 
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              )
            })}
        </div>

      </div>
    </div>
  );
}

export default App;
