import { useRef } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";

interface ImageUploadProps {
    value: File | string | null; // ✅ Accept File or existing image URL
    onChange: (file: File | null) => void;
    error?: string;
}

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const previewUrl = value
        ? typeof value === 'string'
            ? `/storage/${value}` // 👈 for old image path
            : URL.createObjectURL(value)
        : null;

    return (
        <div className="space-y-2">
            <Label>Profile Image</Label>

            <div className="flex items-center gap-4">
                {previewUrl ? (
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-16 w-16 rounded-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No image</span>
                    </div>
                )}

                <Button type="button" variant="outline" onClick={triggerFileInput}>
                    {value ? 'Change Image' : 'Upload Image'}
                </Button>
            </div>

            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {error && <InputError message={error} />}
        </div>
    );
}
