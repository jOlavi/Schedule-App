import React from "react";
import Image from "next/image";
import TodoItem from "./TodoItem";
import type { Todo } from "../lib/types";

interface ListOfTodosProps {
    todosList: { id: number; text: string; status: boolean }[];
    onStatusChange: (id: number) => void;
    requestDelete: (todo: Todo) => void;
}

const DoneTodos = ({ todosList, onStatusChange, requestDelete }: ListOfTodosProps) => {
    return (
        <div>
            <h2 className="text-gray-500 mt-6 text-xl pl-4">COMPLETED:</h2>
            <div className="flex flex-col gap-3 mt-4">
                {todosList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onStatusChange={onStatusChange}
                        requestDelete={requestDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default DoneTodos;
