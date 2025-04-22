import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { DialogDemo } from '@/pages/departments/department-form';
import { Switch } from "@/components/ui/switch"
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { DepartmentType, FlashProps, LinksType } from '@/types/globals';
import DeleteDialog from '@/components/delete-dialog';
import InertiaPagination from '@/components/inertia-pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments',
        href: '/departments',
    },
];

interface DepartmentsType {
    data: DepartmentType[];
    links: LinksType[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}
export default function Index() {
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const [editing, setEditing] = useState<DepartmentType | null>(null);
    const { departments } = usePage<{ departments: DepartmentsType }>().props;

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(null);
    const handleEdit = (department: DepartmentType) => {
        setEditing(department);
    };

    // Function to trigger the delete dialog
    const handleDeleteClick = (id: number) => {
        setDepartmentToDelete(id);
        setOpenDeleteDialog(true);
    };
    // Function to handle the delete action
    const handleDelete = () => {
        if (departmentToDelete !== null) {
            router.delete(route('departments.destroy', departmentToDelete), {
                preserveScroll: true,
                preserveState: true,
                only: ['departments', 'flash'], // Only bring back updated data + flash
            });
            setOpenDeleteDialog(false); // Close the dialog after delete
        }
    };
    const handleStatusToggle = (id: number) => {
        router.put(
            route('departments.toggle-status', id),
            {},
            {
                preserveScroll: true,
                preserveState: true, // 👈 ensures updated props come back
                only: ['departments', 'flash'], // Re-fetch only these props
            },
        );
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
                <Head title="Departments" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="ml-auto">
                        <DialogDemo department={editing} onClose={() => setEditing(null)} />
                    </div>
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="border p-2">#</th>
                                <th className="border p-2 text-start">Name</th>
                                <th className='border p-2'>Created By</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Created At</th>
                                <th className="border p-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {departments.data?.map((department, index) => (
                                <tr key={department.id}>
                                    <td className="border px-2 py-1 text-center">{index + 1}</td>
                                    <td className="border px-2 py-1">{department.name}</td>
                                    <td className="border px-2 py-1">{department.user.name}</td>
                                    <td className="border px-2 py-1 text-center">
                                        <Switch
                                            className="cursor-pointer"
                                            checked={department.status}
                                            onCheckedChange={() => handleStatusToggle(department.id)}
                                        />
                                    </td>
                                    <td className="border px-2 py-1 text-center">
                                        {department.created_at ? new Date(department.created_at).toLocaleDateString() : '—'}
                                    </td>
                                    <td className="space-x-1 border px-2 py-1 text-center">
                                        <button
                                            className="rounded bg-blue-500 cursor-pointer px-3 py-1 text-white hover:bg-blue-600"
                                            onClick={() => handleEdit(department)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600"
                                            onClick={() => handleDeleteClick(department.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* <Pagination links={departments.links} /> */}
                        <div className='mb-2'>
                            <InertiaPagination meta={departments} />
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
                description="Are you sure you want to delete this department?"
            />
        </>

    );
}
