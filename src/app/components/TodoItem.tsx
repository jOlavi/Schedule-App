"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TodoType } from "../lib/types";

import TodoView from "./TodoView";

interface TodoItemProps {
    todo: { id: number; text: string; status: boolean };
    onStatusChange: (id: number) => void;
    requestDelete: (todo: TodoType) => void;
}

const TodoItem = ({ todo, onStatusChange, requestDelete }: TodoItemProps) => {
    // Handle deleting a todo
    const [variant, setVariant] = useState<"small" | "big">("small");
    const [editMode, setEditMode] = useState(false);
    const [textValue, setTextValue] = useState(todo.text || "");
    return (
        <div className={`bg-background rounded-lg shadow-md `} key={todo.id}>
            <div className="flex flex-row gap-6 items-center  mr-4">
                <div className="cursor-pointer pl-2">
                    <button
                        onClick={() => {
                            setVariant(variant === "small" ? "big" : "small");
                            setEditMode(false);
                        }}
                        className="flex items-center justify-center w-10  h-full cursor-pointer"
                    >
                        <Image
                            src={
                                variant === "big" ? "/images/arrowup.svg" : "/images/arrowdown.svg"
                            }
                            alt="arrow"
                            width={25}
                            height={25}
                            className="icon-small"
                        />
                    </button>
                </div>
                <TodoView
                    onStatusChange={onStatusChange}
                    todo={todo}
                    requestDelete={requestDelete}
                    setEditMode={setEditMode}
                    editMode={editMode}
                    textValue={textValue}
                    setTextValue={setTextValue}
                    variant={variant}
                    setVariant={setVariant}
                />
            </div>
        </div>
    );
};

export default TodoItem;
