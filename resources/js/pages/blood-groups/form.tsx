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
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BloodGroupType } from '@/types/globals';
import Toggle from '@/components/toggle';

interface DialogDemoProps {
    bloodGroup?: BloodGroupType | null;
    onClose: () => void;
}

export function BloodGroupsDialog({ bloodGroup, onClose }: DialogDemoProps) {
    const isEditing = Boolean(bloodGroup);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        status: true as boolean,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = isEditing ? put : post;
        const url = isEditing
            ? route('blood-groups.update', bloodGroup?.id)
            : route('blood-groups.store');

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
        if (bloodGroup) {
            setOpen(true);
            setData({
                name: bloodGroup.name,
                status: bloodGroup.status ?? true,
            });
        } else if (!Object.keys(errors).length) {
            // ✅ Only close if there are no validation errors
            setOpen(false);
            reset();
        }

    }, [bloodGroup, setData, reset, errors]);

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) onClose(); // Reset on close
        }}>
            <DialogTrigger asChild>
                {!isEditing && (
                    <Button variant="outline" className="cursor-pointer">
                        Add BloodGroup
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit' : 'Add'} BloodGroup</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update the blood group details.'
                            : 'Provide a name and description.'}
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={submit}>
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.name} />
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
