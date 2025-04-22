<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Auth::user()->posts()->latest();

        if ($request->has('search') && $request->search !== null) {
            $query->whereAny(['title', 'content'], 'like', '%' . $request->search . '%');
        }

        // DON'T use ->toArray()
        $posts = $query->paginate(4)->withQueryString();

        return Inertia::render('posts/index', [
            'posts' => $posts,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'status' => ['required', 'string'],
            'category' => ['required', 'string'],
            'image' => ['required', 'image', 'max:2048']
        ]);

        $file = $request->file('image');
        $filePath = $file->store('posts', 'public');

        Post::create([
            'user_id' => auth()->user()->id,
            'title' => $request->input('title'),
            'slug' => Str::slug($request->input('title')),
            'content' => $request->input('content') ,
            'status' => $request->input('status'),
            'category' => $request->input('category'),
            'image' => $filePath
        ]);

        return to_route('posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post) {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();

         return to_route('posts.index')->with('success', 'Post deleted successfully.');
    }

    public function toggleStatus($id): RedirectResponse
    {
        try{
            $post = Post::findOrFail($id);
            $post->status = !$post->status;
            $post->save();
            return redirect()->back()->with('success', 'Post status updated successfully.');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Failed to update status.');
        }

    }
}
