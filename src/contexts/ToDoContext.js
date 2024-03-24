import { createContext,useContext } from "react";

export const ToDoContext = createContext({
    todoList:[

    ],
    addTodoItem:(todo)=>{},
    updateTodoItem:(id,todo)=>{},
    deleteTodoItem:(id)=>{},
    toggleComplete:(id)=>{}
})

export const UseToDo = () =>{
    return useContext(ToDoContext)
}

export const ToDoProvider = ToDoContext.Provider