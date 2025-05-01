import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import MediaManager from '@/components/media-manager';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Media Library',
        href: '/media',
    },
];

interface MediaItem {
    id: number;
    name: string;
    url: string;
    thumbnail_url: string;
}

interface Props {
    media: {
        data: MediaItem[];
    };
}

const MediaLibrary = ({ media }: Props) => {
    const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Media Library" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Media Library</h1>
                            <button
                                onClick={() => setIsMediaManagerOpen(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                            >
                                Add Media
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {media.data.map(item => (
                                <div key={item.id} className="border rounded overflow-hidden group relative hover:shadow-md transition-shadow">
                                    <div className="aspect-square bg-gray-100">
                                        <img
                                            src={item.thumbnail_url}
                                            alt={item.name}
                                            className="object-cover w-full h-full"
                                            loading="lazy" // Add lazy loading
                                        />
                                    </div>
                                    <p className="p-2 text-xs truncate">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <MediaManager
                isOpen={isMediaManagerOpen}
                onClose={() => setIsMediaManagerOpen(false)}
                onSelect={(media) => {
                    setSelectedMedia(media);
                    setIsMediaManagerOpen(false);
                }}
            />
        </AppLayout>
    );
};

export default MediaLibrary;
