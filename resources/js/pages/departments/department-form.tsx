import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Department } from '@/types/designation';
import { FlashProps } from '@/types/global';

interface DialogDemoProps {
    department?: Department | null;
    onClose: () => void;
}

export function DialogDemo({ department, onClose }: DialogDemoProps) {
    const isEditing = Boolean(department);
    const shownFlash = useRef(false);
    const [open, setOpen] = useState(false);
    const { flash } = usePage<{ flash: FlashProps }>().props;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const url = isEditing
            ? route('departments.update', department?.id)
            : route('departments.store');

        method(url, {
            onSuccess: () => {
                reset(); // Reset form after successful submission
                setOpen(false); // Close the dialog
                onClose(); // Call onClose to reset the selected department
            },
        });
    };

    useEffect(() => {
        // Don't auto-close the dialog if there are errors
        if (department) {
            setOpen(true);
            setData({
                name: department.name,
                description: department.description || '',
            });
        } else if (!Object.keys(errors).length) {
            // ✅ Only close if there are no validation errors
            setOpen(false);
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
    }, [department, setData, reset, flash, errors]);

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) onClose(); // Reset on close
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
