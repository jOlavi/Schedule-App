import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SelectDayProps {
    date: Date | null;
    onChange: (date: Date) => void;
    editMode: boolean;
}

const SelectDay = ({ date, onChange, editMode }: SelectDayProps) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <div className="relative">
            <span className="flex flex-row gap-2 items-center text-gray-500">
                <Image
                    src="/images/calendar-week.svg"
                    alt="calendar"
                    width={22}
                    height={22}
                    className={`small-calendar cursor-pointer`}
                    onClick={() => setShowDatePicker((v) => !v)}
                />
                {date && date.toLocaleDateString("fi-FI")}
            </span>
            {showDatePicker && (
                <div className="absolute z-50 mt-2">
                    <DatePicker
                        selected={date}
                        onChange={(date) => {
                            if (date) onChange(date);
                            setShowDatePicker(false);
                        }}
                        inline
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            )}
        </div>
    );
};

export default SelectDay;
