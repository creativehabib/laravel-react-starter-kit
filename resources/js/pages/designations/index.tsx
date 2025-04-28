import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DialogDemo } from '@/pages/designations/designation-form';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { DesignationType, FlashProps, LinksType, MetaType } from '@/types/globals';
import DeleteDialog from '@/components/delete-dialog';
import InertiaPagination from '@/components/inertia-pagination';
import Toggle from '@/components/toggle';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Designations',
        href: '/designations',
    },
];

interface DesignationsType {
    meta: MetaType;
    data: DesignationType[];
    links: LinksType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}
export default function Index() {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const [editing, setEditing] = useState<DesignationType | null>(null);
    const { designations } = usePage<{ designations: DesignationsType }>().props;

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [designationToDelete, setDesignationToDelete] = useState<number | null>(null);
    const handleEdit = (designation: DesignationType) => {
        setEditing(designation);
    };

    // Function to trigger the delete dialog
    const handleDeleteClick = (id: number) => {
        setDesignationToDelete(id);
        setOpenDeleteDialog(true);
    };
    // Function to handle the delete action
    const handleDelete = () => {
        if (designationToDelete !== null) {
            router.delete(route('designations.destroy', designationToDelete), {
                preserveScroll: true,
                preserveState: true,
                only: ['designations', 'flash'], // Only bring back updated data + flash
            });
            setOpenDeleteDialog(false); // Close the dialog after delete
        }
    };

    const handleStatusToggle = (id: number) => {
        router.post(route('designations.toggle-status', id), {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['designations', 'flash'], // Make sure this matches your Inertia response
        });
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Designations" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="ml-auto">
                        <DialogDemo designation={editing} onClose={() => setEditing(null)} />
                    </div>
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-700 text-white">
                                    <th className="border p-2">#</th>
                                    <th className="border p-2 text-start">Name</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Created At</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {designations.data?.map((designation, index) => (
                                    <tr key={designation.id}>
                                        <td className="border px-2 py-1 text-center">{designations.meta.from + index}</td>
                                        <td className="border px-2 py-1">{designation.title}</td>
                                        <td className="w-fit border px-2 py-1 text-center">
                                            <div className="flex justify-center items-center">
                                                <Toggle
                                                    initial={designation.status}
                                                    onChange={() => handleStatusToggle(designation.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="border px-2 py-1 text-center">
                                            {designation.created_at}
                                        </td>
                                        <td className="space-x-1 border px-2 py-1 text-center">
                                            <button
                                                className="cursor-pointer rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                                onClick={() => handleEdit(designation)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                                onClick={() => handleDeleteClick(designation.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <Pagination links={designations.links} /> */}
                        <div className="mb-2">
                            <InertiaPagination meta={designations.meta} />
                        </div>
                    </div>
                </div>
            </AppLayout>
            {/* Use the DeleteDialog component */}
            <DeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="Are you sure you want to delete this designation?"
            />
        </>
    );
}
