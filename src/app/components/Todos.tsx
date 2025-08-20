"use client";
import React, { useEffect, useState } from "react";
import OpenTodos from "./OpenTodos";
import DoneTodos from "./DoneTodos";

type Todo = {
    id: number;
    text: string;
    status: boolean;
};

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todosList, setTodosList] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("/api/todos");
                console.log("Fetching todos...");
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTodosList(data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []); // Fetch todos when the component mounts;

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
