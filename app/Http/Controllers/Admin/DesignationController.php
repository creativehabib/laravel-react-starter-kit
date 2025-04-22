<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Designation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DesignationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $designations = Designation::orderBy('created_at', 'desc')->paginate(5)->withQueryString();
        return Inertia::render('designations/index', [
            'designations' => $designations,
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
        ]);

        try {
            $designation = Designation::create([
                'title' => $request->input('title'),
                'slug' => Str::slug($request->input('title')),
                'description' => $request->input('description')
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
        ]);

        // Find the designation by ID
        $designation = Designation::findOrFail($id);

        // Update the designation
        $designation->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
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

    /**
     * Toggle the status of the designation.
     */
    public function toggleStatus($id): RedirectResponse
    {
        try{
            $designation = Designation::findOrFail($id);
            $designation->status = !$designation->status;
            $designation->save();

            return Redirect::back()->with('success', 'Status updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating designation status: ' . $e->getMessage());
            return Redirect::back()->with('error', 'Failed to update status.');
        }

    }


}
