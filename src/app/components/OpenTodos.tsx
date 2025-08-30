import React from "react";
import Image from "next/image";
import TodoItem from "./TodoItem";
import { Todo } from "../lib/types";
interface ListOfTodosProps {
    todosList: { id: number; text: string; status: boolean }[];
    onStatusChange: (id: number) => void;
    requestDelete: (todo: Todo) => void;
}

const OpenTodos = ({ todosList, onStatusChange, requestDelete }: ListOfTodosProps) => {
    return (
        <div>
            <h2 className="text-gray-500 mt-6 text-xl pl-4">TO DO:</h2>
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
            {todosList.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No open todos</p>
            )}
        </div>
    );
};

export default OpenTodos;
