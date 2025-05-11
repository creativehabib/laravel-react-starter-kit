<?php

// app/Http/Controllers/MediaController.php
namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class MediaController extends Controller
{
    /**
     * Display a listing of the media items.
     */
    public function index(Request $request)
    {
        $query = Media::query();
        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }
        return $query->orderByDesc('created_at')->paginate(12)->withQueryString();
    }

    /**
     * Store a new media item.
     * @param Request $request
     * @return Media
     */
    public function store(Request $request): Media
    {
        $request->validate(['image' => 'required|image']);
        $file = $request->file('image');
        $path = $file->store('uploads', 'public');
        [$width, $height] = getimagesize($file);
        return Media::create([
            'name' => $file->getClientOriginalName(),
            'filename' => basename($path),
            'mime_type' => $file->getClientMimeType(),
            'path' => $path,
            'size' => $file->getSize(),
            'width' => $width,
            'height' => $height,
            'created_by' => auth()->id() ?? 'system',
        ]);
    }

    /**
     * Upload a media file.
     * @param Request $request
     * @return JsonResponse
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:128000', // 128MB max
        ]);

        $file = $request->file('image');
        $path = $file->store('uploads', 'public');
        [$width, $height] = getimagesize($file);

        $media = Media::create([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => $path,
            'size' => $file->getSize(),
            'width' => $width,
            'height' => $height,
            'created_by' => Auth::id() ?? 1, // fallback if not using auth yet
        ]);

        return response()->json($media);
    }

    /**
     * Update a media item.
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $media = Media::findOrFail($id);
        $request->validate([
            'name' => 'string|max:255',
        ]);

        $media->update($request->only(['name']));

        return response()->json(['sucess' => 'Media updated successfully']);
    }

    /**
     * Delete a media item.
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $media = Media::findOrFail($id);

        // Delete a file from the public disk
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        $media->delete();

        return response()->json(['success' => 'Media deleted successfully']);
    }

    /**
     * Update the image of a media item.
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateImage(Request $request, $id): JsonResponse
    {
        $media = Media::findOrFail($id);
        $request->validate(['image' => 'required|image']);

        // Delete the old file
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        // Store the new file
        $file = $request->file('image');
        $path = $file->store('uploads', 'public');
        [$width, $height] = getimagesize($file);
        // Update media record
        $media->update([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => $path,
            'updated_at' => now(),
            'size' => $file->getSize(),
            'width' => $width,
            'height' => $height,
            'created_by' => Auth::id() ?? 1,
        ]);

        return response()->json([
            'path' => $media->path,
            'name' => $media->name,
            'filename' => $media->filename,
            'mime_type' => $media->mime_type,
            'size' => $media->size,
            'width' => $media->width,
            'height' => $media->height,
            'updated_at' => $media->updated_at,
            'message' => 'Media image updated successfully'
        ]);
    }

    /**
     * Upload an image from a URL.
     * @param Request $request
     * @return JsonResponse
     */
    public function uploadFromUrl(Request $request): JsonResponse
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        try {
            $imageUrl = $request->input('url');
            $imageContents = @file_get_contents($imageUrl);

            if (!$imageContents) {
                return response()->json(['error' => 'Unable to download image'], 400);
            }

            $extension = pathinfo(parse_url($imageUrl, PHP_URL_PATH), PATHINFO_EXTENSION);
            if (!in_array(strtolower($extension), ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                return response()->json(['error' => 'Invalid image type'], 400);
            }

            // Get width and height from the image binary
            $imageInfo = @getimagesizefromstring($imageContents);
            if (!$imageInfo) {
                return response()->json(['error' => 'Could not determine image size'], 400);
            }

            [$width, $height] = $imageInfo;

            $filename = Str::random(40) . '.' . $extension;
            $path = 'uploads/' . $filename;

            Storage::disk('public')->put($path, $imageContents);

            $mimeType = File::mimeType(storage_path("app/public/{$path}"));

            $media = Media::create([
                'name' => pathinfo($filename, PATHINFO_FILENAME),
                'filename' => $filename,
                'mime_type' => $mimeType,
                'path' => $path,
                'size' => strlen($imageContents),
                'width' => $width,
                'height' => $height,
                'created_by' => Auth::id() ?? 1,
            ]);

            return response()->json($media, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Upload failed: ' . $e->getMessage()], 500);
        }
    }


}
