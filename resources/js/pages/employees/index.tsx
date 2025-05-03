import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {
    DepartmentType,
    DesignationType,
    EmployeeType,
    FlashProps,
    LinksType,
    MetaType
} from '@/types/globals';
import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import DeleteDialog from '@/components/delete-dialog';
import InertiaPagination from '@/components/inertia-pagination';
import Toggle from '@/components/toggle';
import { EmployeeDrawer } from '@/pages/employees/form';
import { MediaItem } from '@/types/globals';
import { getImageUrl } from '@/helper/employee';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Employees', href: '/employees' },
];

interface EmployeesType {
    meta: MetaType;
    data: EmployeeType[];
    links: LinksType[];
    triggerLabel?: string; // button label
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

export default function Index() {
    const { flash, employees, departments, designations, media } = usePage<{
        flash: FlashProps;
        employees: EmployeesType;
        departments: DepartmentType[];
        designations: DesignationType[];
        media: MediaItem[];
    }>().props;

    const [editing, setEditing] = useState<EmployeeType | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

    const handleEdit = (employee: EmployeeType) => setEditing(employee);

    const handleDeleteClick = (id: number) => {
        setEmployeeToDelete(id);
        setOpenDeleteDialog(true);
    };

    const handleDelete = () => {
        if (employeeToDelete !== null) {
            router.delete(route('employees.destroy', employeeToDelete), {
                preserveScroll: true,
                preserveState: true,
                only: ['employees', 'flash'],
            });
            setOpenDeleteDialog(false);
        }
    };

    const handleStatusToggle = (id: number) => {
        router.post(route('employees.toggle-status', id), {}, {
            only: ['employees', 'flash'],
            preserveScroll: true,
            preserveState: true,
        });
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Employees" />
                <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="ml-auto">
                        <EmployeeDrawer
                            employee={editing}
                            triggerLabel="Add Employee"
                            departments={departments}
                            designations={designations}
                            media={media as MediaItem[]}
                            onClose={() => setEditing(null)}
                        />
                    </div>

                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="border p-2">#</th>
                                <th className='border p-2'>Image</th>
                                <th className="border p-2 text-start">Name</th>
                                <th className="border p-2 text-start">Department</th>
                                <th className="border p-2">Designation</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Created At</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.data.length > 0 ? (
                                employees.data.map((employee, index) => (
                                    <tr key={employee.id}>
                                        <td className="border px-2 py-1 text-center">{employees.meta.from + index}</td>
                                        <td className='border px-2 py-1 text-center'>
                                            <img
                                                src={getImageUrl(employee.media?.path, 400, 300, employee.media?.name || 'No Image')}
                                                alt={employee.media?.name}
                                                className="h-10 w-10 rounded-full"
                                            />
                                        </td>
                                        <td className="border px-2 py-1">{employee.name}</td>
                                        <td className="border px-2 py-1">{employee.department?.name ?? '—'}</td>
                                        <td className='border px-2 py-1'>
                                            {employee.designation?.title ?? '—'}</td>
                                        <td className="border px-2 py-1 text-center">
                                            <div className="flex justify-center items-center">
                                                <Toggle
                                                    initial={employee.status}
                                                    onChange={() => handleStatusToggle(employee.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="border px-2 py-1 text-center">
                                            {employee.created_at}
                                        </td>
                                        <td className="border px-2 py-1 text-center space-x-1">
                                            <button
                                                className="rounded bg-blue-500 cursor-pointer px-3 py-1 text-white hover:bg-blue-600"
                                                onClick={() => handleEdit(employee)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="rounded bg-red-500 cursor-pointer px-3 py-1 text-white hover:bg-red-600"
                                                onClick={() => handleDeleteClick(employee.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="border px-2 py-4 text-center">
                                        No employee found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                        <div className="mb-2">
                            <InertiaPagination meta={employees.meta} />
                        </div>
                    </div>
                </div>
            </AppLayout>

            <DeleteDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="Are you sure you want to delete this employee?"
            />
        </>
    );
}
