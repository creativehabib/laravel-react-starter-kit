import * as React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import { DepartmentType, DesignationType, EmployeeType, FlashProps } from "@/types/globals";
import toast from "react-hot-toast";
import { useRef } from "react";

interface EmployeeDrawerProps {
    employee?: EmployeeType | null;
    departments: DepartmentType[];
    designations: DesignationType[];
    triggerLabel?: string;
    setEditingEmployee: (employee: EmployeeType | null) => void;
}

export function EmployeeDrawer({
       employee = null,
       departments = [],
       designations = [],
       triggerLabel = "Add Employee",
       setEditingEmployee,
   }: EmployeeDrawerProps) {
    const isEditing = Boolean(employee);
    const [open, setOpen] = React.useState(false);
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const shownFlash = useRef(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: "",
        email: "",
        position: "",
        about: "",
        department_id: "", // <- make empty string
        designation_id: "", // <- make empty string
        status: false,
        phone: "",
        present_address: "",
        permanent_address: "",
    });

    React.useEffect(() => {
        if (employee) {
            setData({
                name: employee.name,
                email: employee.email,
                position: employee.position,
                user_id: 1,
                about: employee.about,
                department_id: employee.department_id ? String(employee.department_id) : "",
                designation_id: employee.designation_id ? String(employee.designation_id) : "",
                status: employee.status,
                phone: employee.phone,
                present_address: employee.present_address,
                permanent_address: employee.permanent_address,
            });
            setOpen(true);
        } else {
            reset();
        }

        if (flash?.success && !shownFlash.current) {
            toast.success(flash.success);
            shownFlash.current = true;
        }

        if (flash?.error && !shownFlash.current) {
            toast.error(flash.error);
            shownFlash.current = true;
        }
    }, [employee, flash, reset, setData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, type } = e.target;
        setData(name as keyof typeof data, type === "checkbox" ? ((e.target as HTMLInputElement).checked ? true : false) : e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing ? put : post;
        const url = isEditing
            ? route("employees.update", employee?.id)
            : route("employees.store");

        method(url, {
            onSuccess: () => {
                reset();
                setOpen(false);
                setEditingEmployee(null);
            },
        });
    };

    const handleClose = () => {
        setOpen(false);
        reset();
        setEditingEmployee(null);
    };

    return (
        <Drawer open={open} onOpenChange={(isOpen) => setOpen(isOpen)} direction="right">
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => {
                        setEditingEmployee(null);
                        reset(); // 💥 Important to clear old data when "Add New"
                        shownFlash.current = false;
                    }}
                >
                    {triggerLabel}
                </Button>
            </DrawerTrigger>

            <DrawerContent className="h-screen w-full ml-auto">
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                    {/* Header */}
                    <DrawerHeader className="border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <DrawerTitle>{isEditing ? "Edit Employee" : "New Employee"}</DrawerTitle>
                                <DrawerDescription>
                                    {isEditing ? "Update employee details." : "Fill in employee details."}
                                </DrawerDescription>
                            </div>
                            <DrawerClose asChild>
                                <Button size="sm" variant="ghost" onClick={handleClose}>
                                    ✕
                                </Button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>

                    {/* Form Body */}
                    <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={data.name} onChange={handleChange} />
                            <InputError message={errors.name} />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} />
                            <InputError message={errors.email} />
                        </div>

                        {/* Position */}
                        <div>
                            <Label htmlFor="position">Position</Label>
                            <Input id="position" name="position" value={data.position} onChange={handleChange} />
                            <InputError message={errors.position} />
                        </div>

                        {/* Phone */}
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" value={data.phone} onChange={handleChange} />
                            <InputError message={errors.phone} />
                        </div>

                        {/* Present Address */}
                        <div>
                            <Label htmlFor="present_address">Present Address</Label>
                            <Textarea id="present_address" name="present_address" value={data.present_address} onChange={handleChange} />
                            <InputError message={errors.present_address} />
                        </div>

                        {/* Permanent Address */}
                        <div>
                            <Label htmlFor="permanent_address">Permanent Address</Label>
                            <Textarea id="permanent_address" name="permanent_address" value={data.permanent_address} onChange={handleChange} />
                            <InputError message={errors.permanent_address} />
                        </div>

                        {/* About */}
                        <div>
                            <Label htmlFor="about">About</Label>
                            <Textarea id="about" name="about" value={data.about} onChange={handleChange} />
                            <InputError message={errors.about} />
                        </div>

                        {/* Department */}
                        <div>
                            <Label htmlFor="department_id">Department</Label>
                            <select
                                id="department_id"
                                name="department_id"
                                value={data.department_id}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.department_id} />
                        </div>

                        {/* Designation */}
                        <div>
                            <Label htmlFor="designation_id">Department</Label>
                            <select
                                id="designation_id"
                                name="designation_id"
                                value={data.designation_id}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Select Department</option>
                                {designations.map((des) => (
                                    <option key={des.id} value={des.id}>
                                        {des.title}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.designation_id} />
                        </div>

                        {/* Status */}
                        <div className="flex items-center space-x-2">
                            <Input
                                id="status"
                                name="status"
                                type="checkbox"
                                checked={data.status}
                                onChange={handleChange}
                            />
                            <Label htmlFor="status">Active</Label>
                        </div>
                    </div>

                    {/* Footer */}
                    <DrawerFooter className="border-t pt-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : isEditing ? "Update" : "Save"}
                        </Button>
                        <DrawerClose asChild>
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
