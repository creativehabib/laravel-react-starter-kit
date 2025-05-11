import * as React from "react";
import { useForm } from "@inertiajs/react";
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
import { DepartmentType, DesignationType, EmployeeFormData, EmployeeType, MediaItem } from '@/types/globals';
import Toggle from '@/components/toggle';
import { transformEmployeeToFormData } from '@/helper/employee';
import SetFeaturedImage from '@/components/media-image-select';

interface EmployeeDrawerProps {
    employee?: EmployeeType | null;
    departments: DepartmentType[];
    designations: DesignationType[];
    media: MediaItem[];
    triggerLabel?: string;
    onClose: () => void;
}

const initialFormData: EmployeeFormData = {
    name: "",
    email: "",
    phone: "",
    position: "",
    department_id: "",
    designation_id: "",
    user_id: "",
    pf_number: "",
    joining_date: "",
    date_of_birth: "",
    blood_group: "",
    emergency_contact: "",
    bank_account_number: "",
    bank_name: "",
    verify: "",
    media_id: null,
    status: true,
    present_address: "",
    permanent_address: "",
    about: "",
};

export function EmployeeDrawer({
       employee = null,
       departments = [],
       designations = [],
       media = [],
       triggerLabel,
       onClose,
   }: EmployeeDrawerProps) {
    const isEditing = Boolean(employee);
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm<EmployeeFormData>(initialFormData);

    // Form field configuration
    const formFields = [
        { id: 'name', label: 'Name', type: 'text', component: Input },
        { id: 'email', label: 'Email', type: 'email', component: Input },
        { id: 'position', label: 'Position', type: 'text', component: Input },
        { id: 'phone', label: 'Phone', type: 'text', component: Input },
        { id: 'present_address', label: 'Present Address', component: Textarea },
        { id: 'permanent_address', label: 'Permanent Address', component: Textarea },
        { id: 'bank_account_number', label: 'Bank Account Number', type: 'text', component: Input },
        { id: 'bank_name', label: 'Bank Name', type: 'text', component: Input },
        { id: 'pf_number', label: 'PF Number', type: 'text', component: Input },
        { id: 'date_of_birth', label: 'Date of Birth', type: 'date', component: Input },
        { id: 'joining_date', label: 'Joining Date', type: 'date', component: Input },
        { id: 'blood_group', label: 'Blood Group', type: 'text', component: Input },
        { id: 'verify', label: 'Verify', type: 'text', component: Input },
        { id: 'emergency_contact', label: 'Emergency Contact', type: 'text', component: Input },
        { id: 'about', label: 'About', component: Textarea },
    ];

    React.useEffect(() => {
        if (employee) {
            setOpen(true);
            setData(transformEmployeeToFormData(employee));

        } else if (!Object.keys(errors).length) {
            setOpen(false);
            reset();
        }

    }, [employee, errors, reset, setData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
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
                onClose();
            },
        });
    };

    const handleImageSelect = (media: Partial<MediaItem> | null) => {
        if (media?.id !== undefined) {
            setData('media_id', media?.id ?? null);
        }
    };


    const handleClose = () => {
        reset();
        setOpen(false);
        onClose();
    };
    return (
        <Drawer open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) onClose(); // Reset on close
        }} direction="right">
            <DrawerTrigger asChild>
                <Button
                    className='cursor-pointer'
                    variant="outline"
                    onClick={() => { onClose(); reset(); }}
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
                                <DrawerTitle>{isEditing ? "Edit" : "New"} Employee</DrawerTitle>
                                <DrawerDescription>
                                    {isEditing ? "Update employee details." : "Fill in employee details."}
                                </DrawerDescription>
                            </div>
                            <DrawerClose asChild>
                                <Button size="sm" className='cursor-pointer' variant="ghost" onClick={handleClose}>✕</Button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>

                    {/* Form Body */}
                    <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                        {/*Render standard fields*/}
                        {formFields.map((field) => {
                            const FieldComponent = field.component;
                            return (
                                <div key={field.id}>
                                    <Label htmlFor={field.id} className='mb-4'>{field.label}</Label>
                                    <FieldComponent
                                        id={field.id}
                                        name={field.id}
                                        value={data[field.id as keyof EmployeeFormData] as string}
                                        onChange={handleChange}
                                        type={field.type || 'text'}
                                    />
                                    <InputError message={errors[field.id as keyof typeof errors]} />
                                </div>
                            );
                        })}


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
                            <Label htmlFor="designation_id">Designation</Label>
                            <select
                                id="designation_id"
                                name="designation_id"
                                value={data.designation_id}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Select Designation</option>
                                {designations.map((des) => (
                                    <option key={des.id} value={des.id}>
                                        {des.title}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.designation_id} />
                        </div>

                        <div className="mt-4">


                            <SetFeaturedImage
                                onSelect={handleImageSelect}
                                initial={
                                    Array.isArray(media) && media.length > 0 && data.media_id
                                        ? media.find((img) => img.id === Number(data.media_id))
                                        : undefined
                                }
                            />
                        </div>

                        {/* Status */}
                        <div className="flex items-center space-x-2">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Toggle
                                    initial={!!Number(data.status)}
                                    onChange={(val: boolean) => setData('status', val)}
                                />
                                <InputError message={errors.status} />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <DrawerFooter className="border-t pt-4">
                        <Button type="submit" disabled={processing} className='cursor-pointer' variant="outline">
                            {processing ? "Saving..." : isEditing ? "Update" : "Save"}
                        </Button>
                        <DrawerClose asChild>
                            <Button type="button" variant="outline" onClick={handleClose} className='cursor-pointer'>
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
