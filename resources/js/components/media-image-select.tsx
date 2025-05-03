import React, { useState } from 'react';
import MediaManagerModal from '@/components/media-manager';
export type MediaItem = {
    id: number;
    name: string;
    filename: string;
    path: string;
    mime_type: string;
    size: number;
};

interface Props {
    onSelect: (media: Partial<MediaItem>) => void;
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

    return (
        <div className="mb-4">
            <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 text-white cursor-pointer px-2 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-800 transition duration-200"
            >
                Set Featured Image
            </button>

            {selectedImage && (
                <div className="mt-2">
                    <img src={`/storage/${selectedImage.path}`} className="h-24 rounded" alt={selectedImage.name}/>
                    <input type="hidden" name="media_id" value={selectedImage.id} />
                </div>
            )}

            {modalOpen && (
                <MediaManagerModal onClose={() => setModalOpen(false)} onConfirm={handleSelect} />
            )}
        </div>
    );
};

export default SetFeaturedImage;
