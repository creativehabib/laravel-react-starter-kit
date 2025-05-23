<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\DesignationResource;
use App\Models\Designation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DesignationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Designation::query()->orderBy('created_at', 'desc');
        $designations = $query->paginate(5)->withQueryString();
        return Inertia::render('designations/index', [
            'designations' => DesignationResource::collection($designations),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255|unique:designations,title',
            'description' => 'nullable|string|max:255',
            'status' => 'boolean',
        ]);

        try {
            $designation = Designation::create([
                'title' => $request->input('title'),
                'slug' => Str::slug($request->input('title')),
                'description' => $request->input('description'),
                'status' => $request->input('status') ? 1 : 0,
            ]);

            if ($designation) {
                return redirect()->back()->with(
                    'success', 'Designation created successfully!'
                );
            }

            return redirect()->back()->with(
                'error', 'Something went wrong!'
            );

        } catch (\Exception $e) {
            return redirect()->back()->with(
                'error', 'Something went wrong!'
            );
        }
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
        // Validate the request
        $request->validate([
            'title' => 'required|string|max:255|unique:designations,title,'.$id,
            'description' => 'nullable|string|max:255',
            'status' => 'boolean',
        ]);

        // Find the designation by ID
        $designation = Designation::findOrFail($id);

        // Update the designation
        $designation->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status') ? 1 : 0,
        ]);

        // Redirect back with a flash success message
        return redirect()->back()->with('success', 'Designation updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $designation = Designation::findOrFail($id);
        $designation->delete();

        return redirect()->back()->with('success', 'Designation deleted successfully.');
    }


    public function toggleStatus($id)
    {
        try {
            $designation = Designation::findOrFail($id);
            $designation->update(['status' => !$designation->status]);
            return redirect()->back()->with('success',
                $designation->status ? 'Designation activated.' : 'Designation deactivated.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }



}
