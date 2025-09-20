import React from "react";

interface PopUpAlertProps {
    onConfirm: () => void;
    onCancel: () => void;
    label: string;
}

const PopUpDelete = ({ onConfirm, onCancel, label }: PopUpAlertProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center  ">
            <div className="flex flex-col bg-[#222831] text-white p-6 rounded-lg shadow-lg items-center justify-center w-90 h-50">
                <p className=" text-center mb-2 font-bold text-lg ">
                    Are you sure you want to remove:
                </p>
                <p className="mb-4">{label}</p>
                <div className="flex flex-row gap-4 ">
                    <button
                        className="px-4 py-2 w-24 bg-navColor text-white rounded hover:bg-red-400 cursor-pointer"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 w-24 bg-[#62A388] text-white rounded hover:bg-green-400 cursor-pointer"
                        onClick={onConfirm}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUpDelete;
