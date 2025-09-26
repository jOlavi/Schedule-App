"use client";
import React, { useEffect, useState } from "react";
import OpenTodos from "./OpenTodos";
import DoneTodos from "./DoneTodos";
import PopUpAlert from "./PopUpDelete";
import { TodoType } from "../lib/types";
import { updateTodoApi } from "../lib/api";

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todosList, setTodosList] = useState<TodoType[]>([]);
    const [errorText, setErrorText] = useState<string>("");
    const [popupVisible, setPopupVisible] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState<TodoType | null>(null);
    const [allVariant, setAllVariant] = useState<"small" | "big">("small");

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

    const onTodoUpdate = async (
        id: number,
        updates: { text?: string; status?: boolean; due_date?: string }
    ) => {
        try {
            // Using the utility function to update the todo
            const updatedTodo = await updateTodoApi(id, updates);
            setTodosList(todosList.map((todo) => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
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
    // Prepare to delete a todo
    const requestDelete = (todo: TodoType) => {
        setTodoToDelete(todo);
        setPopupVisible(true);
    };
    // Handle deleting a todo
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
        <div className="w-[700px] ">
            <div className=" flex flex-row gap-4 justify-center">
                <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="border border-gray-500 p-4 text-xl bg-background rounded-lg w-full focus:border-gray-400 focus:outline-none"
                />
                <button
                    className="border border-gray-500 p-4 text-xl w-24 cursor-pointer bg-background rounded-lg hover:border-gray-400"
                    onClick={handleAddTodo}
                >
                    Add
                </button>
            </div>
            {errorText && <p className=" text-red-500 text-center mt-2">{errorText}</p>}
            <div>
                <OpenTodos
                    todosList={todosList
                        .filter((todo) => todo.status === false)
                        // Sort by creation date
                        .sort(
                            (a, b) =>
                                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                        )}
                    onTodoUpdate={onTodoUpdate}
                    requestDelete={requestDelete}
                    allVariant={allVariant}
                    setAllVariant={setAllVariant}
                />
            </div>
            <div>
                <DoneTodos
                    todosList={todosList
                        .filter((todo) => todo.status === true)
                        // Sort by creation date
                        .sort(
                            (a, b) =>
                                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                        )}
                    onTodoUpdate={onTodoUpdate}
                    requestDelete={requestDelete}
                    allVariant={allVariant}
                    setAllVariant={setAllVariant}
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
