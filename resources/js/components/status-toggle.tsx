import { useState, useEffect, FC } from "react";

interface Props {
    id: number;
    status: boolean;
    onToggle: (id: number, newStatus: boolean) => void;
}

const StatusToggle: FC<Props> = ({ id, status, onToggle }) => {
    const [checked, setChecked] = useState(status);

    // 🔄 Sync when `status` from props changes (e.g., after backend update)
    useEffect(() => {
        setChecked(status);
    }, [status]);

    const handleChange = () => {
        const newStatus = !checked;
        setChecked(newStatus); // Optimistically update UI
        onToggle(id, newStatus); // Call parent to update backend
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative">
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
        </label>
    );
};

export default StatusToggle;
