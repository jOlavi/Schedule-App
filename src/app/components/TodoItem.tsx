"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TodoType } from "../lib/types";

import TodoView from "./TodoView";

interface TodoItemProps {
    todo: { id: number; text: string; status: boolean; created_at: Date | string };
    onTodoUpdate: (
        id: number,
        updates: { text?: string; status?: boolean; due_date?: string }
    ) => void;
    requestDelete: (todo: TodoType) => void;
    allVariant: "small" | "big";
    setAllVariant: (variant: "small" | "big") => void;
}

const TodoItem = ({
    todo,
    onTodoUpdate,
    requestDelete,
    allVariant,
    setAllVariant,
}: TodoItemProps) => {
    const [variant, setVariant] = useState<"small" | "big">("small");
    const [editMode, setEditMode] = useState(false);
    const [textValue, setTextValue] = useState(todo.text || "");

    const effectiveVariant = allVariant === "small" ? variant : allVariant;
    return (
        <div className={`bg-background rounded-lg shadow-md `} key={todo.id}>
            <div className="flex flex-row gap-6 items-center  mr-4">
                <div className="cursor-pointer pl-2">
                    <button
                        onClick={() => {
                            if (allVariant === "small") {
                                setVariant(variant === "small" ? "big" : "small");
                                setEditMode(false);
                            }
                        }}
                        className="flex items-center justify-center w-10  h-full cursor-pointer"
                    >
                        <Image
                            src={
                                effectiveVariant === "big"
                                    ? "/images/arrowup.svg"
                                    : "/images/arrowdown.svg"
                            }
                            alt="arrow"
                            width={25}
                            height={25}
                            className="icon-small"
                        />
                    </button>
                </div>
                <TodoView
                    onTodoUpdate={onTodoUpdate}
                    todo={todo}
                    requestDelete={requestDelete}
                    setEditMode={setEditMode}
                    editMode={editMode}
                    textValue={textValue}
                    setTextValue={setTextValue}
                    variant={effectiveVariant}
                    setVariant={setVariant}
                />
            </div>
        </div>
    );
};

export default TodoItem;
