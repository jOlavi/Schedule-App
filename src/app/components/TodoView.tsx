"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TodoType } from "../lib/types";
import InputField from "./InputField";
import SelectDay from "./SelectDay";

interface TodoViewProps {
    todo: { id: number; text: string; status: boolean };
    onStatusChange: (id: number) => void;
    requestDelete: (todo: TodoType) => void;
    setEditMode: (editMode: boolean) => void;
    editMode?: boolean;
    textValue?: string;
    setTextValue?: (value: string) => void;
    variant?: "small" | "big";
    setVariant: (variant: "small" | "big") => void;
}

const TodoView = ({
    todo,
    onStatusChange,
    requestDelete,
    setEditMode,
    editMode = false,
    textValue,
    setTextValue,
    variant = "small",
    setVariant,
}: TodoViewProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleEditModeToggle = (variant: string) => {
        setEditMode(!editMode);
        setVariant(variant as "small" | "big");
    };
    return (
        <div
            className={`flex flex-row gap-6 items-center w-full ${
                variant === "big" ? "h-40" : "h-18"
            } ${editMode && "h-64"}`}
        >
            <input
                type="checkbox"
                className="scale-150 cursor-pointer"
                checked={todo.status}
                onChange={() => onStatusChange(todo.id)}
            />
            <h1
                className={`text-xl tracking-wider max-w-xs ${todo.status ? "line-through" : ""} ${
                    variant === "small" ? "truncate" : ""
                }`}
            >
                {editMode && setTextValue && textValue !== undefined ? (
                    <InputField
                        textValue={textValue}
                        setTextValue={setTextValue}
                        variant={variant}
                    />
                ) : (
                    todo.text
                )}
                {editMode && (
                    <div className="text-lg flex flex-row gap-2 mt-2 ">
                        <button
                            className="px-2 py-2 w-20 bg-navColor text-white rounded hover:bg-red-400 cursor-pointer"
                            onClick={() => handleEditModeToggle("big")}
                        >
                            Cancel
                        </button>
                        <button className="px-2 py-2 w-20 bg-[#62A388] text-white rounded hover:bg-green-400 cursor-pointer ">
                            Save
                        </button>
                    </div>
                )}
            </h1>
            <div
                className={`flex  justify-end ml-auto ${
                    variant === "big" ? "flex-col items-center" : "flex-row gap-4"
                }`}
            >
                <SelectDay
                    date={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        // Tee PATCH-pyyntö jos haluat tallentaa päivämäärän
                    }}
                    editMode={editMode}
                />

                {variant === "big" && (
                    <div className="flex flex-row gap-3 mt-2">
                        <button className={`${variant === "big" && "crud-button"}`}>
                            <Image
                                src="/images/edit.svg"
                                alt="edit"
                                width={20}
                                height={20}
                                className={`icon-small hover:opacity-80 transition-opacity duration-200`}
                                onClick={() => handleEditModeToggle("big")}
                            />
                        </button>

                        <button
                            onClick={() => requestDelete(todo)}
                            className={`${variant === "big" && "crud-button"}`}
                        >
                            <Image
                                src="/images/trash.svg"
                                alt="delete"
                                width={20}
                                height={20}
                                className="icon-small hover:opacity-80 transition-opacity duration-200"
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoView;
