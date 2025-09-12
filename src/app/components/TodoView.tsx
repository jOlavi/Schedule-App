import React from "react";
import Image from "next/image";
import { TodoType } from "../lib/types";
import InputField from "./InputField";

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
    const handleEditModeToggle = () => {
        setEditMode(!editMode);
        setVariant("big");
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
                {editMode && <button>Save</button>}
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
            <div className="flex flex-row gap-4">
                <button>
                    <Image
                        src="/images/edit.svg"
                        alt="edit"
                        width={20}
                        height={20}
                        className="icon-small hover:opacity-80 transition-opacity duration-200"
                        onClick={handleEditModeToggle}
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
    );
};

export default TodoView;
