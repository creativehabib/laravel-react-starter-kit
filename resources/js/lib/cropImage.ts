import type { Area } from 'react-easy-crop';

export const getCroppedImg = (
    imageSrc: string,
    pixelCrop: Area,
    outputWidth = pixelCrop.width,
    outputHeight = pixelCrop.height
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageSrc;

        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = outputWidth;
            canvas.height = outputHeight;

            const ctx = canvas.getContext('2d');
            if (!ctx) return reject('No canvas context');

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                outputWidth,
                outputHeight
            );

            canvas.toBlob((blob) => {
                if (!blob) return reject('Canvas is empty');
                resolve(blob);
            }, 'image/jpeg');
        };

        image.onerror = reject;
    });
};
