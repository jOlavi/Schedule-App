import Image from "next/image";
import React from "react";
import { Todo } from "../lib/types";

interface TodoItemProps {
    todo: { id: number; text: string; status: boolean };
    onStatusChange: (id: number) => void;
    requestDelete: (todo: Todo) => void;
}

const TodoItem = ({ todo, onStatusChange, requestDelete }: TodoItemProps) => {
    // Handle deleting a todo

    return (
        <div className="bg-background p-4 rounded-lg shadow-md" key={todo.id}>
            <div className="flex flex-row gap-6 items-center">
                <input
                    type="checkbox"
                    className=" scale-150 cursor-pointer"
                    checked={todo.status}
                    onChange={() => onStatusChange(todo.id)}
                />
                <h1
                    className={`text-xl tracking-wider truncate max-w-xs ${
                        todo.status === true ? "line-through" : ""
                    }`}
                >
                    {todo.text}
                </h1>
                <p className="flex flex-row ml-auto gap-2 items-center text-gray-500">
                    <Image
                        src="/images/calendar-week.svg"
                        alt="calendar"
                        width={22}
                        height={22}
                        className="small-calendar"
                    />
                    18/10/2025
                </p>
                <div className="flex flex-row gap-4 ">
                    <button>
                        <Image
                            src="/images/edit.svg"
                            alt="edit"
                            width={20}
                            height={20}
                            className="icon-small hover:opacity-80 transition-opacity duration-200"
                        />
                    </button>
                    <button onClick={() => requestDelete(todo)}>
                        <Image
                            src="/images/trash.svg"
                            alt="delete"
                            width={20}
                            height={20}
                            className="icon-small hover:opacity-80 transition-opacity duration-200"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
