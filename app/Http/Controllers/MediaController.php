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
        return Media::latest()->get();
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
}
