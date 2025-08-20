import React from "react";
import Image from "next/image";

interface ListOfTodosProps {
    todosList: { id: number; text: string; status: boolean }[];
    onStatusChange: (id: number) => void;
}

const OpenTodos = ({ todosList, onStatusChange }: ListOfTodosProps) => {
    return (
        <div>
            <h2 className="text-gray-500 mt-6 text-xl pl-4">TO DO:</h2>
            <div className="flex flex-col gap-3 mt-4">
                {todosList.map((todo) => (
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
                        </div>
                    </div>
                ))}
            </div>
            {todosList.length === 0 && (
                <p className="text-gray-500 text-center mt-4">No open todos</p>
            )}
        </div>
    );
};

export default OpenTodos;
