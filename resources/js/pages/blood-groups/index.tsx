import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import Toggle from '@/components/toggle';
import toast from 'react-hot-toast';
import { BloodGroupType, FlashProps, LinksType } from '@/types/globals';
import InertiaPagination from '@/components/inertia-pagination';
import { Edit, Trash2 } from 'lucide-react';
import DeleteDialog from '@/components/delete-dialog';
import { BloodGroupsDialog } from '@/pages/blood-groups/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blood Groups',
        href: '/blood-groups',
    },
];
interface BloodGroup {
    data: BloodGroupType[];
    links: LinksType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

const BloodGroupsIndex = () => {
    const { flash } = usePage<{flash: FlashProps}>().props;
    const [editing, setEditing] = React.useState<BloodGroupType | null>(null);
    const { bloodGroups } = usePage<{ bloodGroups: BloodGroup }>().props;
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [bloodGroupToDelete, setBloodGroupToDelete] = React.useState<number | null>(null);

    const handleEdit = (bloodGroup: BloodGroupType) => {
        setEditing(bloodGroup);
    };

    const handleDeleteClick = (id: number) => {
        setBloodGroupToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleDelete = () => {
        if (bloodGroupToDelete !== null) {
            router.delete(route('blood-groups.destroy', bloodGroupToDelete), {
                preserveScroll: true,
                preserveState: true,
                only: ['bloodGroups', 'flash'],
            });
            setOpenDeleteDialog(false);
        }
    };
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if( flash?.error) {
            toast.error(flash.error);
        }

    }, [flash]);

    const toggleStatus = (id: number) => {
        router.post(route('blood-groups.toggle-status', id), {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['bloodGroups', 'flash'],
        });
    };

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Blood Groups" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="ml-auto">
                        <BloodGroupsDialog bloodGroup={editing} onClose={() => setEditing(null)} />
                    </div>
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="border p-2">#</th>
                                <th className="border p-2 text-start">Blood Group</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Created At</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bloodGroups.data.length > 0 ? (
                                bloodGroups.data.map((bloodGroup, index) => (
                                    <tr key={bloodGroup.id}>
                                        <td className="border px-2 py-1 text-center">{index + 1}</td>
                                        <td className="border px-2 py-1">{bloodGroup.name}</td>
                                        <td className="border px-2 py-1 text-center">
                                            <Toggle
                                                initial={bloodGroup.status}
                                                onChange={() => toggleStatus(bloodGroup.id)}
                                            />
                                        </td>
                                        <td className="border px-2 py-1 text-center">
                                            {bloodGroup.created_at
                                                ? new Date(bloodGroup.created_at).toLocaleDateString()
                                                : '—'}
                                        </td>
                                        <td className="space-x-1 border px-2 py-1 text-center">
                                            {/* Add your action buttons here */}
                                            <button
                                                className="rounded bg-blue-500 cursor-pointer px-3 py-1 text-white hover:bg-blue-600"
                                                onClick={() => handleEdit(bloodGroup)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600"
                                                onClick={() => handleDeleteClick(bloodGroup.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="border px-2 py-4 text-center">
                                        No blood groups found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <InertiaPagination meta={bloodGroups} />
                    </div>
                </div>
            </AppLayout>
            <DeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="Are you sure you want to delete this blood group?"
            />
        </>
    );
}
export default BloodGroupsIndex;
