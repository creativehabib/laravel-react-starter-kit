import React, { useState } from 'react';
import MediaManagerModal from '@/components/media-manager';
export type MediaItem = {
    id: number | null | undefined;
    name: string;
    filename: string;
    path: string;
    mime_type: string;
    size: number;
};

interface Props {
    onSelect: (media: Partial<MediaItem> | null) => void;
    initial?: MediaItem;
}

const SetFeaturedImage: React.FC<Props> = ({ onSelect, initial }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<MediaItem | null>(initial || null);

    const handleSelect = (media: MediaItem) => {
        setSelectedImage(media);
        onSelect(media);
        setModalOpen(false);
    };

    React.useEffect(() => {
        setSelectedImage(initial || null);
    }, [initial]);


    return (
        <div className="mb-4 space-y-2">
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 text-white cursor-pointer px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-800 transition duration-200"
            >
                {selectedImage ? 'Change Featured Image' : 'Select Featured Image'}
            </button>

            {selectedImage && (
                <div className="relative group w-fit">
                    <img
                        src={`/storage/${selectedImage.path}`}
                        className="h-24 w-auto rounded shadow object-cover"
                        alt={selectedImage.name}
                    />

                    {/* Remove the button on hover */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedImage(null);
                                onSelect({ id: null });
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 cursor-pointer py-1 rounded"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}

            {modalOpen && (
                <MediaManagerModal onClose={() => setModalOpen(false)} onConfirm={handleSelect} />
            )}
        </div>
    );
};

export default SetFeaturedImage;
