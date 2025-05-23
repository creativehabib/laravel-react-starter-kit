<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Department::query()->orderBy('created_at', 'desc');
        $departments = $query->paginate(5)->withQueryString();
        return Inertia::render('departments/index', [
            'departments' => DepartmentResource::collection($departments),
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
            'name' => 'required|string|max:255|unique:departments,name',
            'description' => 'nullable|string|max:255',
            'status' => 'boolean',
        ]);

        try {
            $designation = Department::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'status' => $request->input('status') ? 1 : 0,
                'user_id' => auth()->user()->id,
            ]);

            if ($designation) {
                return redirect()->back()->with(
                    'success', 'Department created successfully!'
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
            'name' => 'required|string|max:255|unique:departments,name,'.$id,
            'description' => 'nullable|string|max:255',
            'status' => 'boolean',
        ]);

        // Find the designation by ID
        $designation = Department::findOrFail($id);

        // Update the designation
        $designation->update([
            'name' => $request->input('name'),
            'created_by' => auth()->user()->id,
            'description' => $request->input('description'),
            'status' => $request->input('status') ? 1 : 0,
        ]);

        // Redirect back with a flash success message
        return redirect()->back()->with('success', 'Department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return redirect()->back()->with('success', 'Department deleted successfully.');
    }

    public function toggleStatus($id)
    {
        try {
            $department = Department::findOrFail($id);
            $department->update(['status' => !$department->status]);
            return redirect()->back()->with('success',
            $department->status ? 'Department activated.' : 'Department deactivated.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }

}
