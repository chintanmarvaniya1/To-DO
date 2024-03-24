import { useState ,useEffect} from 'react'
import './App.css'
import { ToDoProvider } from './contexts/ToDoContext'
import TodoForm from './components/ToDoForm'
import TodoItem from './components/ToDoItem'

function App() {
  const [todoList, settodoList] = useState([])

  const addTodoItem = (todo) => {
    settodoList((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodoItem = (id, todo) => {
    settodoList((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodoItem = (id) => {
    settodoList((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    settodoList((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todoList"))

    if (todoList && todoList.length > 0) {
      settodoList(todoList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList))
  }, [todoList])

  return (
    <ToDoProvider value={{todoList,addTodoItem,updateTodoItem,deleteTodoItem,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todoList.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>

  )
}

export default App
