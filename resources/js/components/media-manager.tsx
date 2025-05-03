import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MediaItem } from '@/types/globals';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import DeleteDialog from '@/components/delete-dialog';

interface Props {
    onClose: () => void;
    onConfirm: (image: MediaItem) => void;
}

const MediaManagerModal: React.FC<Props> = ({ onClose, onConfirm }) => {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [selected, setSelected] = useState<MediaItem | null>(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [editName, setEditName] = useState('');
    const featuredCount = media.length ? media.filter((img) => img.filename).length : 0;

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletingImage, setDeletingImage] = useState<MediaItem | null>(null);


    useEffect(() => {
        fetchMedia(1);
    }, []);

    const fetchMedia = (pageNum: number) => {
        setLoading(true);
        axios.get(`/media?page=${pageNum}`)
            .then(res => {
                const data = res.data;
                if (pageNum === 1) {
                    setMedia(data.data);
                } else {
                    setMedia(prev => [...prev, ...data.data]);
                }
                setHasMore(data.current_page < data.last_page);
                setPage(data.current_page);
            })
            .finally(() => setLoading(false));
    };

    const loadMore = () => {
        if (hasMore) {
            fetchMedia(page + 1);
        }
    };

    const onDrop = (acceptedFiles: File[]) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        setUploading(true);

        axios.post('/media-upload', formData)
            .then(() => {
                toast.success('Image uploaded successfully');
                fetchMedia(1);
            })
            .catch((error) => {
                console.error('Upload failed:', error);
                toast.error('Upload failed');
            })
            .finally(() => setUploading(false));
    };


    // Sync editName with selected item
    useEffect(() => {
        setEditName(selected?.name || '');
    }, [selected]);

    // Save to server onBlur
    const handleSaveName = () => {
        if (!selected || editName === selected.name) return;

        axios.put(`/media/${selected.id}`, { name: editName })
            .then(() => {
                setSelected({ ...selected, name: editName });
                setMedia((prev) =>
                    prev.map((img) => (img.id === selected.id ? { ...img, name: editName } : img))
                );
                toast.success('Name updated');
            })
            .catch((error) => {
                console.error('Update failed:', error);
                toast.error('Failed to update name');
                setEditName(selected.name); // revert to the previous name
            });
    };


    const handleCopy = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                toast.success('Copied to clipboard');
            }).catch((err) => {
                console.error('Copy failed:', err);
                toast.error('Failed to copy');
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                toast.success('Copied to clipboard');
            } catch (err) {
                console.error('Fallback copy failed:', err);
                toast.error('Copy not supported');
            }
            document.body.removeChild(textarea);
        }
    };

    const handleImageChange = (file: string | Blob) => {
        if (!file || !selected) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('old_path', selected.path);

        axios.post(`/media/${selected.id}/update-image`, formData)
            .then((res) => {
                toast.success('Image updated');

                const updated = {
                    ...selected,
                    path: res.data.path,
                    updated_at: res.data.updated_at, // ✅ include this
                };

                setMedia((prev) =>
                    prev.map((img) =>
                        img.id === selected.id ? updated : img
                    )
                );

                setSelected(updated);
            })
            .catch(() => toast.error('Failed to update image'));
    };


    const handleDelete = () => {
        if (!deletingImage) return;

        axios
            .delete(`/media/${deletingImage.id}`)
            .then(() => {
                setMedia((prev) => prev.filter((img) => img.id !== deletingImage.id));
                if (selected?.id === deletingImage.id) setSelected(null);
                toast.success("Image deleted");
            })
            .catch(() => toast.error("Failed to delete image"))
            .finally(() => {
                setOpenDeleteDialog(false);
                setDeletingImage(null);
            });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="!w-[90vw] !max-w-[90vw] max-h-[90vh] p-0 flex flex-col">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>Total Feature Images: ({featuredCount})</DialogTitle>
                </DialogHeader>

                <div className="px-6 overflow-y-auto flex-1">
                    <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="upload">Upload files</TabsTrigger>
                            <TabsTrigger value="library">Media Library</TabsTrigger>
                            <TabsTrigger value="optimole">Optimole</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upload">
                            <div
                                {...getRootProps()}
                                className="border-dashed border-2 border-gray-300 rounded p-10 text-center cursor-pointer bg-gray-50 dark:bg-gray-800"
                            >
                                <input {...getInputProps()} />
                                <p className="text-lg">Drop files to upload</p>
                                <p className="text-sm text-muted-foreground my-2">or</p>
                                <Button disabled={uploading}>
                                    {uploading ? <Loader2 className="animate-spin mr-2" /> : null}
                                    Select Files
                                </Button>
                                <p className="text-sm text-gray-500 mt-4">Maximum upload file size: 128 MB</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="library">
                            {loading && media.length === 0 ? (
                                <div className="flex justify-center items-center h-64">
                                    <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <div className="flex-1 overflow-y-auto max-h-[30rem]">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                            {media.map((img) => (
                                                <div
                                                    key={img.id}
                                                    className={`rounded border-2 overflow-hidden cursor-pointer ${
                                                        selected?.id === img.id ? 'border-blue-500' : 'border-transparent'
                                                    }`}
                                                    onClick={() => setSelected(img)}
                                                >
                                                    <img
                                                        src={`/storage/${img.path}?t=${img.updated_at || Date.now()}`}
                                                        alt={img.name || 'Image'}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {hasMore && (
                                            <div className="text-center mt-4">
                                                <Button onClick={loadMore} disabled={loading}>
                                                    {loading ? <Loader2 className="animate-spin mr-2" /> : 'Load More'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {selected && (
                                        <div className="w-64 border rounded p-4 bg-gray-50 dark:bg-gray-900">
                                            <img
                                                src={`/storage/${selected.path}`}
                                                alt={selected.name}
                                                className="w-full h-40 object-cover rounded"
                                            />
                                            {/* Edit & Delete Buttons */}
                                            <div className="flex justify-end mt-1 space-x-1">
                                                <label className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded cursor-pointer hover:bg-blue-700">
                                                    Change
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleImageChange(file);
                                                        }}
                                                    />
                                                </label>

                                                <Button
                                                    variant="destructive"
                                                    className="px-2 py-1 cursor-pointer bg-red-600 text-xs text-white rounded hover:bg-red-700"
                                                    size="sm"
                                                    onClick={() => {
                                                        setDeletingImage(selected);
                                                        setOpenDeleteDialog(true);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Name:</p>
                                                <input
                                                    type="text"
                                                    className="mb-2 border rounded px-2 py-1 w-full"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    onBlur={handleSaveName}
                                                />


                                                <p className="font-semibold">Size:</p>
                                                <p className="mb-2">{(selected.size / 1024).toFixed(2)} KB</p>

                                                <p className="font-semibold">Type:</p>
                                                <p className="mb-2">{selected.mime_type}</p>
                                                <p><strong>Uploaded:</strong></p>
                                                <p>
                                                    {
                                                        new Date(selected.created_at).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })
                                                    }
                                                </p>

                                                {/* Full URL Copy */}
                                                <div className="mt-4">
                                                    <p className="font-semibold">Full URL:</p>
                                                    <div className="flex items-center space-x-2 overflow-hidden">
                                                        <input
                                                            type="text"
                                                            readOnly
                                                            value={`${window.location.origin}/storage/${selected.path}`}
                                                            className="flex-1 border rounded px-2 py-1 text-sm truncate min-w-0"
                                                        />

                                                        <button
                                                            onClick={() => handleCopy(`${window.location.origin}/storage/${selected.path}`)}
                                                            className="text-xs px-2 py-1 cursor-pointer bg-blue-600 text-white rounded"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="optimole">
                            <div className="text-center py-10 text-muted-foreground">Optimole integration coming soon...</div>
                        </TabsContent>
                    </Tabs>
                </div>

                <DialogFooter className="border-t p-4 bg-background">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={() => selected && onConfirm(selected)}
                        disabled={!selected}
                    >
                        Add Featured Image
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <DeleteDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            onConfirm={handleDelete}
            title="Delete Image"
            description="This will permanently remove the image from the system."
        />
    </>
    );
};

export default MediaManagerModal;
