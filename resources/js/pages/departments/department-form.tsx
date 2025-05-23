import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DepartmentType } from '@/types/globals';
import Toggle from "@/components/toggle"; // Make sure this exists

interface DialogDemoProps {
    department?: DepartmentType | null;
    onClose: () => void;
}

export function DialogDemo({ department, onClose }: DialogDemoProps) {
    const isEditing = Boolean(department);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        status: true as boolean,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const url = isEditing
            ? route('departments.update', department?.id)
            : route('departments.store');

        method(url, {
            onSuccess: () => {
                reset();
                setOpen(false);
                onClose();
            },
        });
    };

    useEffect(() => {
        if (department) {
            setOpen(true);
            setData({
                name: department.name,
                description: department.description || '',
                status: department.status ?? true,
            });
        } else if (!Object.keys(errors).length) {
            setOpen(false);
            reset();
        }
    }, [department, setData, reset, errors]);

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) onClose();
        }}>
            <DialogTrigger asChild>
                {!isEditing && (
                    <Button variant="outline" className="cursor-pointer">
                        Add Department
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit' : 'Add'} Department</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update the department details.'
                            : 'Provide a name and description.'}
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={submit}>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            disabled={processing}
                            rows={4}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Toggle
                            initial={!!Number(data.status)}
                            onChange={(val) => setData('status', val)}
                        />
                        <InputError message={errors.status} />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="animate-spin h-4 w-4 mr-2" />}
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
