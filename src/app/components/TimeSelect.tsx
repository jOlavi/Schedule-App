import React from "react";

interface TimeSelectProps {
    label: string;
    date: Date | undefined;
    onChange: (hour: number, minute: number) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = [0, 15, 30, 45];

const TimeSelect = ({ label, date, onChange }: TimeSelectProps) => {
    const hour = date ? date.getHours() : 0;
    const minute = date ? date.getMinutes() : 0;
    // let shownHourSize = 6;
    return (
        <div>
            <div className={label === "End" ? "flex justify-end" : ""}>
                <p className={`text-xl ${label === "End" ? "text-right" : ""}`}>{label}</p>
            </div>{" "}
            <hr className="text-gray-500 max-w-[140px]" />
            <div className="flex gap-2 mt-5 p-1">
                <select
                    value={hour}
                    onChange={(e) => onChange(Number(e.target.value), minute)}
                    className="border rounded p-1 h-10 w-14 overflow-y-auto"
                >
                    {hours.map((h) => (
                        <option key={h} value={h}>
                            {h.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
                :
                <select
                    value={minute}
                    onChange={(e) => onChange(hour, Number(e.target.value))}
                    className="border rounded p-1 h-10 w-14"
                >
                    {minutes.map((m) => (
                        <option key={m} value={m}>
                            {m.toString().padStart(2, "0")}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TimeSelect;
