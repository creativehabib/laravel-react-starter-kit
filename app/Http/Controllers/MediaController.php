<?php

// app/Http/Controllers/MediaController.php
namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function index()
    {
        return Media::latest()->paginate(8)->withQueryString();
    }

    public function store(Request $request)
    {
        $request->validate(['image' => 'required|image']);
        $file = $request->file('image');
        $path = $file->store('uploads', 'public');

        return Media::create([
            'name' => $file->getClientOriginalName(),
            'filename' => basename($path),
            'mime_type' => $file->getClientMimeType(),
            'path' => $path,
            'size' => $file->getSize(),
            'created_by' => auth()->id() ?? 'system',
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:128000', // 128MB max
        ]);

        $file = $request->file('image');
        $path = $file->store('uploads', 'public');

        $media = Media::create([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => $path,
            'size' => $file->getSize(),
            'created_by' => Auth::id() ?? 1, // fallback if not using auth yet
        ]);

        return response()->json($media);
    }

    public function update(Request $request, $id)
    {
        $media = Media::findOrFail($id);
        $request->validate([
            'name' => 'string|max:255',
        ]);

        $media->update($request->only(['name']));

        return response()->json(['message' => 'Media updated successfully']);
    }

    public function destroy($id)
    {
        $media = Media::findOrFail($id);

        // ✅ Delete file from the public disk
        if (Storage::disk('public')->exists($media->path)) {
            Storage::disk('public')->delete($media->path);
        }

        $media->delete();

        return response()->json(['success' => 'Media deleted successfully']);
    }

    public function updateImage(Request $request, $id)
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

        // Update media record
        $media->update([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'path' => $path,
            'updated_at' => now(),
            'size' => $file->getSize(),
            'created_by' => Auth::id() ?? 1,
        ]);

        return response()->json([
            'path' => $media->path,
            'name' => $media->name,
            'updated_at' => $media->updated_at,
            'message' => 'Media image updated successfully'
        ]);
    }



}
