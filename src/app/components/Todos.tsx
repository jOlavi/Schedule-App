"use client";
import React, { useState } from "react";
import OpenTodos from "./OpenTodos";
import DoneTodos from "./DoneTodos";

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todosList, setTodosList] = useState([
        { id: 1, text: "Buy groceries", status: false },
        { id: 2, text: "Walk the dog", status: false },
        { id: 3, text: "Finish project", status: true },
        {
            id: 4,
            text: "Remember to call to your mom and tell her that you love her! and then you need to add some more text here to test does it realy truncate",
            status: true,
        },
        { id: 5, text: "Read a book", status: false },
        { id: 6, text: "Clean the house", status: false },
    ]);

    const onStatusChange = (id: number) => {
        setTodosList(
            todosList.map((todo) => (todo.id === id ? { ...todo, status: !todo.status } : todo))
        );
    };
    const handleAddTodo = () => {
        if (!todo.trim()) return; // Prevent adding empty todos

        // Create a new todo object and add it to the list
        const newTodo = { id: todosList.length + 1, text: todo, status: false };
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
                    className="border border-gray-500 p-4 text-xl bg-background rounded-lg w-full"
                />
                <button
                    className="border border-gray-500 p-4 text-xl w-24 cursor-pointer bg-background rounded-lg"
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>
            <div>
                <OpenTodos
                    todosList={todosList.filter((todo) => todo.status === false)}
                    onStatusChange={onStatusChange}
                />
            </div>
            <div>
                <DoneTodos
                    todosList={todosList.filter((todo) => todo.status === true)}
                    onStatusChange={onStatusChange}
                />
            </div>
        </div>
    );
};

export default Todos;
