import CalendarView from "@/app/components/CalendarView";
import Todos from "@/app/components/Todos";
import React from "react";

const TasksView = () => {
    return (
        <div className="flex flex-col bg-navColor items-center h-screen p-5">
            <h1>Tasks</h1>
            <div className="mt-4">
                <Todos />
            </div>
        </div>
    );
};

export default TasksView;
