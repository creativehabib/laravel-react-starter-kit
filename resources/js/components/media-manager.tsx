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
import { EditIcon, Loader2, TrashIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import DeleteDialog from '@/components/delete-dialog';
import MediaCropper from './media-cropper';

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

    const [imageUrl, setImageUrl] = useState('');


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
        if (acceptedFiles.length === 0) return;

        setUploading(true);

        const uploads = acceptedFiles.map(file => {
            const formData = new FormData();
            formData.append('image', file);
            return axios.post('/media-upload', formData);
        });

        Promise.allSettled(uploads)
            .then(results => {
                const successes = results.filter(r => r.status === 'fulfilled').length;
                const failures = results.filter(r => r.status === 'rejected').length;

                if (successes) toast.success(`${successes} file(s) uploaded successfully`);
                if (failures) toast.error(`${failures} file(s) failed to upload`);

                fetchMedia(1); // reload media
            })
            .catch(err => {
                console.error('Upload error:', err);
                toast.error('Error uploading files');
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
    const urlInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleCopy = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                toast.success('Copied to clipboard');
                if (urlInputRef.current) {
                    urlInputRef.current.select(); // Focus the input after copying
                }
            }).catch((err) => {
                console.error('Copy failed:', err);
                toast.error('Failed to copy');
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                toast.success('Copied to clipboard');
                if (urlInputRef.current) {
                    urlInputRef.current.select(); // Focus the input after copying
                }
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

    // upload form url
    const handleUrlUpload = () => {
        if (!imageUrl) return toast.error('Please provide a valid image URL');

        setUploading(true);

        axios.post('/media-upload-from-url', { url: imageUrl })
            .then(() => {
                toast.success('Image uploaded from link');
                setImageUrl('');
                fetchMedia(1);
            })
            .catch(err => {
                console.error('URL upload failed:', err);
                toast.error('Upload from URL failed');
            })
            .finally(() => setUploading(false));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true, maxSize: 128 * 1024 * 1024 });


    // Inside your MediaManagerModal component
    const [isCropping, setIsCropping] = useState(false); // Track if the cropper is open

    const handleCropImage = () => {
        setIsCropping(true); // Open the cropper when the user clicks the "edit" button
    };

    const handleCropComplete = (croppedBlob: Blob) => {
        if (!selected) return;

        const originalName = selected.name || 'cropped';
        const filename = originalName.endsWith('.jpg') || originalName.endsWith('.webp') || originalName.endsWith('.png')
            ? originalName
            : originalName + '.jpg';

        const file = new File([croppedBlob], filename, { type: croppedBlob.type });

        handleImageChange(file);
        setIsCropping(false);
    };


    return (
        <>
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="!w-[95vw] !max-w-[95vw] max-h-[95vh] p-0 flex flex-col">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>Feature Images: ({featuredCount})</DialogTitle>
                </DialogHeader>

                <div className="px-6 overflow-y-auto flex-1">
                    <Tabs defaultValue="library" className="w-full">
                        <TabsList className="mb-4 sticky top-0 z-10 bg-white dark:bg-gray-800">
                            <TabsTrigger value="upload" className="text-black dark:text-white">Upload files</TabsTrigger>
                            <TabsTrigger value="url" className="text-black dark:text-white">Upload from Link</TabsTrigger>
                            <TabsTrigger value="library" className="text-black dark:text-white">Media Library</TabsTrigger>
                            <TabsTrigger value="optimole" className="text-black dark:text-white">Optimise</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upload">
                            <div
                                {...getRootProps()}
                                className="border-dashed border-2 border-gray-300 rounded p-10 text-center cursor-pointer bg-gray-50 dark:bg-gray-900"
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                                            {media.map((img) => (
                                                <div
                                                    key={img.id}
                                                    className={`rounded border-2 relative group overflow-hidden cursor-pointer ${
                                                        selected?.id === img.id ? 'border-blue-500' : 'border-transparent'
                                                    }`}
                                                    onClick={() => setSelected(img)}
                                                >
                                                    <img
                                                        src={`/storage/${img.path}?t=${img.updated_at || Date.now()}`}
                                                        alt={img.name || 'Image'}
                                                        className="w-full h-32 object-cover"
                                                    />

                                                    {/* crop image edits the button on hover */}
                                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            onClick={handleCropImage}
                                                            type="button"
                                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 cursor-pointer py-1 rounded"
                                                        >
                                                            <EditIcon className="w-4 h-4"/>
                                                        </button>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) handleImageChange(file);
                                                            }}
                                                        />
                                                    </div>
                                                    {/* delete image button */}
                                                    <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            className="px-2 py-1 cursor-pointer bg-red-600 text-xs text-white rounded hover:bg-red-700"
                                                            onClick={() => {
                                                                setDeletingImage(selected);
                                                                setOpenDeleteDialog(true);
                                                            }}
                                                        >
                                                            <TrashIcon className="w-4 h-4"/>
                                                        </button>
                                                    </div>

                                                </div>

                                            ))}
                                        </div>
                                        {hasMore && (
                                            <div className="text-center mt-4">
                                                <Button onClick={loadMore} variant='default' disabled={loading} className='cursor-pointer'>
                                                    {loading ? <Loader2 className="animate-spin" /> : 'Load More'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {selected && (
                                        <div className="w-64 border rounded p-4 bg-gray-50 dark:bg-gray-950">
                                            <img
                                                src={`/storage/${selected.path}`}
                                                alt={selected.name}
                                                className="w-full h-40 object-cover rounded"
                                            />
                                            {/* Replace image buttons */}
                                            <div className="text-center mt-1">
                                                <label className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded cursor-pointer hover:bg-blue-700">
                                                    Replace Image
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
                                                <p className="font-semibold">Dimensions:</p>
                                                <p className="mb-2">{selected.width} × {selected.height} px</p>

                                                {/* Full URL Copy */}
                                                <div className="mt-4">
                                                    <p className="font-semibold">Full URL:</p>
                                                    <div className="flex items-center space-x-2 overflow-hidden">
                                                        <input
                                                            ref={urlInputRef}
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

                        {/*upload from url*/}
                        <TabsContent value="url">
                            <div className="max-w-md mx-auto space-y-4">
                                <p className="text-sm text-muted-foreground">Paste the direct image URL to upload:</p>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="flex-1 border rounded px-3 py-2 text-sm"
                                    />
                                    <Button onClick={handleUrlUpload} disabled={uploading}>
                                        {uploading ? <Loader2 className="animate-spin mr-2" /> : null}
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>


                        <TabsContent value="optimole">
                            <div className="text-center py-10 text-muted-foreground">Optimise integration coming soon...</div>
                        </TabsContent>
                    </Tabs>
                </div>

                <DialogFooter className="border-t p-4 bg-background">
                    <DialogClose asChild>
                        <Button variant="outline" className='cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button
                        className='cursor-pointer'
                        variant='default'
                        onClick={() => selected && onConfirm(selected)}
                        disabled={!selected}
                    >
                        Set featured image
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <DeleteDialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            onConfirm={handleDelete}
            title="Confirm Deletion"
            description="This will permanently remove the image from the system."
        />

        {/* Render MediaCropper if isCropping is true */}
        {isCropping && selected && (
            <MediaCropper
                imageSrc={`/storage/${selected.path}?t=${selected.updated_at}`}
                onCancel={() => setIsCropping(false)}
                onCropComplete={handleCropComplete}
            />
        )}
    </>
    );
};

export default MediaManagerModal;
