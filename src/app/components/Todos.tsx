"use client";
import React, { useState } from "react";
import ListOfTodos from "./ListOfTodos";

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todosList, setTodosList] = useState([
        { id: 1, text: "Buy groceries" },
        { id: 2, text: "Walk the dog" },
        { id: 3, text: "Finish project" },
        {
            id: 4,
            text: "Remember to call to your mom and tell her that you love her! and then you need to add some more text here to test does it realy truncate",
        },
    ]);

    const handleAddTodo = () => {
        if (!todo.trim()) return; // Prevent adding empty todos

        // Create a new todo object and add it to the list
        const newTodo = { id: todosList.length + 1, text: todo };
        todosList.push(newTodo);
        console.log(todosList);
        setTodo(""); // Clear the input field after adding
    };

    return (
        <div className="w-[600px]">
            <div className=" flex flex-row gap-4 justify-center">
                <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="border p-4 text-xl bg-background rounded-lg w-full"
                />
                <button
                    className="border p-4 text-xl w-24 cursor-pointer bg-background rounded-lg"
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>
            <div>
                <ListOfTodos todosList={todosList} />
            </div>
        </div>
    );
};

export default Todos;
