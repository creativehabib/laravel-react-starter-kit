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

interface Props {
    onClose: () => void;
    onConfirm: (image: MediaItem) => void;
}

const MediaManagerModal: React.FC<Props> = ({ onClose, onConfirm }) => {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [selected, setSelected] = useState<MediaItem | null>(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = () => {
        setLoading(true);
        axios.get('/media')
            .then(res => setMedia(res.data))
            .finally(() => setLoading(false));
    };

    const onDrop = (acceptedFiles: File[]) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        setUploading(true);

        axios.post('/media-upload', formData)
            .then(fetchMedia)
            .finally(() => setUploading(false));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="!w-[90vw] !max-w-[90vw] max-h-[90vh] p-0 flex flex-col">
                <DialogHeader className="p-6">
                    <DialogTitle>Feature Image</DialogTitle>
                </DialogHeader>

                <div className="px-6 overflow-y-auto flex-1">
                    <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="upload" className="cursor-pointer">Upload files</TabsTrigger>
                            <TabsTrigger value="library" className="cursor-pointer">Media Library</TabsTrigger>
                            <TabsTrigger value="optimole" className="cursor-pointer">Optimole</TabsTrigger>
                        </TabsList>

                        {/* Upload Tab */}
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

                        {/* Media Library Tab */}
                        <TabsContent value="library">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[24rem] overflow-y-auto flex-1">
                                        {media.map((img) => (
                                            <div
                                                key={img.id}
                                                className={`rounded border-2 overflow-hidden cursor-pointer ${
                                                    selected?.id === img.id ? 'border-blue-500' : 'border-transparent'
                                                }`}
                                                onClick={() => setSelected(img)}
                                            >
                                                <img
                                                    src={`/storage/${img.path}`}
                                                    alt={img.name}
                                                    className="w-full h-32 object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selected Image Preview */}
                                    {selected && (
                                        <div className="w-64 border rounded p-4 bg-gray-50 dark:bg-gray-900">
                                            <img
                                                src={`/storage/${selected.path}`}
                                                alt={selected.name}
                                                className="w-full h-40 object-cover rounded mb-4"
                                            />
                                            <div>
                                                <p className="font-semibold">Name:</p>
                                                <p className="mb-2 break-words">{selected.name}</p>

                                                <p className="font-semibold">Size:</p>
                                                <p className="mb-2">{(selected.size / 1024).toFixed(2)} KB</p>

                                                <p className="font-semibold">Type:</p>
                                                <p className="mb-2">{selected.mime_type}</p>
                                                <p><strong>Uploaded:</strong> {new Date(selected.created_at).toLocaleString()}</p>
                                                <p className="break-words text-sm mt-2 text-gray-600">
                                                    <strong>Path:</strong> {selected.path}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </TabsContent>

                        {/* Optimole Placeholder */}
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
    );
};

export default MediaManagerModal;
