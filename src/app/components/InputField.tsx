"use client";
import React, { useState } from "react";

interface InputFieldProps {
    textValue: string;
    setTextValue: (value: string) => void;
    variant: "small" | "big";
}

const InputField = ({ textValue, setTextValue, variant }: InputFieldProps) => {
    return (
        <div className=" w-[320px] ">
            <textarea
                className={`
        border border-gray-500 p-2 bg-background rounded-lg w-full  text-lg
        focus:bg-navColor focus:outline-none 
    `}
                rows={variant === "big" ? 4 : 2}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            />
        </div>
    );
};

export default InputField;
