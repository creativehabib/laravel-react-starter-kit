import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getCroppedImg } from '@/lib/cropImage';

interface Props {
    imageSrc: string;
    onCancel: () => void;
    onCropComplete: (blob: Blob) => void;
}

const MediaCropper: React.FC<Props> = ({ imageSrc, onCancel, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState<number | undefined>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropCompleteCallback = useCallback((_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleCrop = async () => {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        if (croppedImage) {
            onCropComplete(croppedImage);
        }
    };

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent className="w-screen h-screen max-w-none max-h-none p-0 overflow-hidden">
                <div className="flex flex-col h-full w-full">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle>Crop Image</DialogTitle>
                    </DialogHeader>

                    {/* Aspect Ratio Buttons */}
                    <div className="flex gap-2 justify-center p-4 border-b">
                        <Button variant={aspect === undefined ? "default" : "outline"} onClick={() => setAspect(undefined)}>Free</Button>
                        <Button variant={aspect === 1 ? "default" : "outline"} onClick={() => setAspect(1)}>1:1</Button>
                        <Button variant={aspect === 16 / 9 ? "default" : "outline"} onClick={() => setAspect(16 / 9)}>16:9</Button>
                        <Button variant={aspect === 4 / 3 ? "default" : "outline"} onClick={() => setAspect(4 / 3)}>4:3</Button>
                    </div>

                    {/* Cropper */}
                    <div className="relative w-full flex-1 bg-black">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropCompleteCallback}
                        />
                    </div>

                    {/* Footer Buttons */}
                    <DialogFooter className="p-4 border-t">
                        <Button variant="outline" className='cursor-pointer' onClick={onCancel}>Cancel</Button>
                        <Button onClick={handleCrop} className='cursor-pointer'>Crop & Save</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MediaCropper;
