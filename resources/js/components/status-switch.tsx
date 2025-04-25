import { useState, useEffect } from "react";

const StatusSwitch = ({ id, status, onToggle }: { id: number, status: boolean, onToggle: (id: number, newStatus: boolean) => void }) => {
    const [checked, setChecked] = useState(status);

    useEffect(() => {
        setChecked(status);
    }, [status]);

    const handleChange = () => {
        const newStatus = !checked;
        setChecked(newStatus);
        onToggle(id, newStatus); // call parent function to toggle
    };

    return (
        <label className="inline-flex cursor-pointer items-center">
            <input
                type="checkbox"
                className="peer sr-only"
                checked={checked}
                onChange={handleChange}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"></div>
        </label>
    );
};
