import CalendarView from "@/app/components/CalendarView";
import Todos from "@/app/components/Todos";
import React from "react";

const TasksView = () => {
    return (
        <div className="flex flex-col bg-navColor items-center h-full p-5 ml-[200px]">
            <h1 className="text-2xl my-4">Your tasks</h1>
            <div className="mt-4">
                <Todos />
            </div>
        </div>
    );
};

export default TasksView;
