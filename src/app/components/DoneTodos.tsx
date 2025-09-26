import React from "react";
import Image from "next/image";
import TodoItem from "./TodoItem";
import type { TodoType } from "../lib/types";

interface ListOfTodosProps {
    todosList: { id: number; text: string; status: boolean; created_at: Date | string }[];
    onTodoUpdate: (
        id: number,
        updates: { text?: string; status?: boolean; due_date?: string }
    ) => void;
    requestDelete: (todo: TodoType) => void;
    allVariant: "small" | "big";
    setAllVariant: (variant: "small" | "big") => void;
}

const DoneTodos = ({
    todosList,
    onTodoUpdate: onStatusChange,
    requestDelete,
    allVariant,
    setAllVariant,
}: ListOfTodosProps) => {
    return (
        <div>
            <h2 className="text-gray-500 mt-6 text-xl pl-4">COMPLETED:</h2>
            <div className="flex flex-col gap-3 mt-4">
                {todosList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onTodoUpdate={onStatusChange}
                        requestDelete={requestDelete}
                        allVariant={allVariant}
                        setAllVariant={setAllVariant}
                    />
                ))}
            </div>
        </div>
    );
};

export default DoneTodos;
