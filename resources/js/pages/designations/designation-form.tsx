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
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DesignationType } from '@/types/globals';
import Toggle from '@/components/toggle';

interface DialogDemoProps {
    designation?: DesignationType | null;
    onClose: () => void;
}

export function DialogDemo({ designation, onClose }: DialogDemoProps) {
    const isEditing = Boolean(designation);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        description: '',
        status: true as boolean,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing ? put : post;
        const url = isEditing
            ? route('designations.update', designation?.id)
            : route('designations.store');

        method(url, {
            onSuccess: () => {
                reset(); // Reset form after successful submission
                setOpen(false); // Close the dialog
                onClose(); // Call onClose to reset the selected designation
            },
        });
    };

    useEffect(() => {
        // Don't auto-close the dialog if there are errors
        if (designation) {
            setOpen(true);
            setData({
                title: designation.title,
                description: designation.description || '',
                status: designation.status ?? true,
            });
        } else if (!Object.keys(errors).length) {
            // ✅ Only close if there are no validation errors
            setOpen(false);
            reset();
        }
    }, [designation, setData, reset, errors]);

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) onClose(); // Reset on close
        }}>
            <DialogTrigger asChild>
                {!isEditing && (
                    <Button variant="outline" className="cursor-pointer">
                        Add Designation
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit' : 'Add'} Designation</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update the designation details.'
                            : 'Provide a name and description.'}
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={submit}>
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.title} />
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
