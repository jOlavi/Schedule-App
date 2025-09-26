import React from "react";
import Image from "next/image";
import TodoItem from "./TodoItem";
import { TodoType } from "../lib/types";
interface ListOfTodosProps {
    todosList: { id: number; text: string; status: boolean; created_at: string | Date }[];
    onTodoUpdate: (
        id: number,
        updates: { text?: string; status?: boolean; due_date?: string }
    ) => void;
    requestDelete: (todo: TodoType) => void;
    allVariant: "small" | "big";
    setAllVariant: (variant: "small" | "big") => void;
}

const OpenTodos = ({
    todosList,
    onTodoUpdate,
    requestDelete,
    allVariant,
    setAllVariant,
}: ListOfTodosProps) => {
    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-between mt-6 text-gray-500 text-xl">
                <h2 className=" pl-4">TO DO:</h2>
                <div className=" gap-4 flex flex-row">
                    <button className="w-18 h-10 border cursor-pointer hover:text-white hover:border-gray-400">
                        Sort
                    </button>
                    <button
                        className="w-24 h-10 border cursor-pointer hover:text-white hover:border-gray-400"
                        onClick={() => setAllVariant(allVariant === "small" ? "big" : "small")}
                    >
                        {allVariant === "big" ? "Hide all" : "Show all"}
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                {todosList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onTodoUpdate={onTodoUpdate}
                        requestDelete={requestDelete}
                        allVariant={allVariant}
                        setAllVariant={setAllVariant}
                    />
                ))}
            </div>
            {todosList.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No open todos</p>
            )}
        </div>
    );
};

export default OpenTodos;
