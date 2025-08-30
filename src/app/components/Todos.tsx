"use client";
import React, { useEffect, useState } from "react";
import OpenTodos from "./OpenTodos";
import DoneTodos from "./DoneTodos";
import PopUpAlert from "./PopUpDelete";

type Todo = {
    id: number;
    text: string;
    status: boolean;
};

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todosList, setTodosList] = useState<Todo[]>([]);
    const [errorText, setErrorText] = useState<string>("");
    const [popupVisible, setPopupVisible] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

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
    // Handle adding a new todo
    const handleAddTodo = async () => {
        if (!todo.trim()) {
            setErrorText("Todo cannot be empty...");
            setTimeout(() => setErrorText(""), 3000); // Clear error after 3 seconds
            return;
        } // Prevent adding empty todos

        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: todo, status: false }),
            });
            if (!response.ok) throw new Error("Failed to add todo");
            const newTodo = await response.json();
            setTodosList([...todosList, newTodo]); // Add the new todo to the list
            setTodo(""); // Clear the input field
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };
    const requestDelete = (todo: Todo) => {
        setTodoToDelete(todo);
        setPopupVisible(true);
    };
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete todo");
            setTodosList(todosList.filter((todo) => todo.id !== id)); // Remove the todo from the list
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };
    const confirmDelete = async () => {
        if (todoToDelete) {
            await handleDelete(todoToDelete.id);
            setPopupVisible(false);
            setTodoToDelete(null);
        }
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
            {errorText && <p className=" text-red-500 text-center mt-2">{errorText}</p>}
            <div>
                <OpenTodos
                    todosList={todosList.filter((todo) => todo.status === false)}
                    onStatusChange={onStatusChange}
                    requestDelete={requestDelete}
                />
            </div>
            <div>
                <DoneTodos
                    todosList={todosList.filter((todo) => todo.status === true)}
                    onStatusChange={onStatusChange}
                    requestDelete={requestDelete}
                />
            </div>
            {popupVisible && (
                <PopUpAlert
                    onConfirm={confirmDelete}
                    onCancel={() => {
                        setPopupVisible(false);
                    }}
                    label={todoToDelete?.text || ""}
                />
            )}
        </div>
    );
};

export default Todos;
