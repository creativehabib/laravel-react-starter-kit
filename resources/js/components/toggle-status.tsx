import { useState } from 'react';
import { router } from '@inertiajs/react';

interface ToggleStatusProps {
    id: number | string;
    initial: boolean;
    routeName: string; // Laravel route name like 'designations.toggle-status'
    only?: string[];   // Optional for Inertia `only` prop
}

export default function ToggleStatus({ id, initial, routeName, only }: ToggleStatusProps) {
    const [enabled, setEnabled] = useState<boolean>(initial);

    const handleToggle = () => {
        const newStatus = !enabled;
        setEnabled(newStatus);

        router.put(route(routeName, id), { status: newStatus }, {
            preserveScroll: true,
            preserveState: true,
            only: only || [],
            headers: {
                Accept: 'application/json', // prevents 303 redirect
            },
            onError: () => {
                setEnabled(!newStatus); // Revert if error
            },
        });
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={enabled}
                onChange={handleToggle}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300" />
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-full" />
        </label>
    );
}
