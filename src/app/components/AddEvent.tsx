import React from "react";
import Image from "next/image";
import TimeSelect from "./TimeSelect";
import { eventColors } from "../utils/items";
import SelectDay from "./SelectDay";
interface AddEventProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNewEvent: React.Dispatch<React.SetStateAction<{ start: Date; end: Date } | null>>;
    handleAddEvent: () => void;
    newEvent: { start: Date; end: Date } | null;
    setNewEventTime: (type: "start" | "end", hour: number, minute: number) => void;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    color: string;
    label: string;
}

const AddEvent = ({
    title,
    setTitle,
    setPopupOpen,
    setNewEvent,
    handleAddEvent,
    setNewEventTime,
    newEvent,
    setColor,
    color,
    label,
}: AddEventProps) => {
    return (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
            <div className="relative bg-[#222831] p-6 rounded-lg shadow-lg min-w-[500px] h-[500px] flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl mb-1">{label}</h2>
                    <hr className=" text-gray-500 max-w-[200px]" />
                    <div className="flex gap-2 mb-2 absolute top-6 right-6">
                        {eventColors.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className={`w-7 h-7 rounded-full border-2 ${
                                    color === c ? "border-white brightness-125" : "border-gray-400"
                                } cursor-pointer hover:brightness-125 }}`}
                                style={{ background: c }}
                                onClick={() => setColor(c)}
                                aria-label={`Select color ${c}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mt-6 justify-center items-center">
                    <input
                        className="text-xl  border border-gray-500 rounded p-4 w-full h-full mb-4 max-w-[380px] focus:bg-navColor focus:outline-none "
                        placeholder="Event title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {newEvent?.start && (
                        <div className=" text-gray-300 text-lg flex flex-col items-center justify-center w-[25px] h-[25px] mb-4 mt-4">
                            {/* Add an component to change the day by clicking the calendar icon */}
                            <Image
                                src="/images/calendar-week.svg"
                                alt="calendar"
                                width={25}
                                height={25}
                                className="filter-white"
                            />

                            {newEvent.start.toLocaleDateString("fi-FI")}
                        </div>
                    )}
                    <div className="flex flex-row flex-1 justify-center w-full items-center gap-6 mt-2">
                        <div>
                            <TimeSelect
                                label="Start"
                                date={newEvent?.start}
                                onChange={(hour, minute) => setNewEventTime("start", hour, minute)}
                            />
                        </div>
                        <Image
                            src="/images/clock.svg"
                            alt="clock"
                            width={35}
                            height={35}
                            className="filter-white"
                        />
                        <div className="flex flex-col">
                            <TimeSelect
                                label="End"
                                date={newEvent?.end}
                                onChange={(hour, minute) => setNewEventTime("end", hour, minute)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button className="px-4 py-2 w-30 bg-navColor text-white rounded border border-gray-500 cursor-pointer">
                        Add notes
                    </button>
                </div>
                <div>
                    <hr className="mt-4 mx-auto text-gray-500 max-w-[400px]" />
                    <div className="flex gap-6 justify-center items-center mt-8">
                        <button
                            className="px-4 py-2 w-24 bg-navColor text-white rounded hover:bg-red-400 cursor-pointer"
                            onClick={() => {
                                setPopupOpen(false);
                                setTitle("");
                                setNewEvent(null);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 w-24 bg-[#62A388] text-white rounded hover:bg-green-400 cursor-pointer"
                            onClick={handleAddEvent}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
