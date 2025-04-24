import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import Toggle from '@/components/toggle';
import toast from 'react-hot-toast';
import { FlashProps } from '@/types/globals';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blood Groups',
        href: '/blood-groups',
    },
];
interface BloodGroup {
    id: number;
    name: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    bloodGroups: BloodGroup[];

}
const BloodGroupsIndex: React.FC<PageProps> = ({ bloodGroups }) => {
    const { flash } = usePage<{flash: FlashProps}>().props;
    const { data, setData, post, reset } = useForm<{ name: string }>({ name: '' });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

    }, [flash]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('blood-groups.store'));
        reset();
    };

    const toggleStatus = (id: number) => {
        axios.post(`/blood-groups/${id}/toggle-status`).then(
            response => {
                router.reload();
                toast.success(response.data.success);
            }).catch(error => {
                toast.error(error.response?.data?.error);
            });

    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blood Groups" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">Blood Groups</h1>

                    <form onSubmit={submit} className="mb-6">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="New blood group"
                            className="border p-2 rounded mr-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Add
                        </button>
                    </form>

                    <table className="w-full table-auto border">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bloodGroups.map((bg) => (
                            <tr key={bg.id}>
                                <td className="p-2 border">{bg.name}</td>
                                <td className="p-2 border">{bg.status ? 'Enabled' : 'Disabled'}</td>
                                <td className="p-2 border">
                                    <Toggle
                                        initial={bg.status}
                                        onChange={() => toggleStatus(bg.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
export default BloodGroupsIndex;
