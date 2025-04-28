<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\BloodGroupResource;
use App\Models\BloodGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BloodGroupController extends Controller
{
    public function index()
    {
        $query = BloodGroup::query()->orderBy('created_at', 'desc');
        $bloodGroups = $query->paginate(5)->withQueryString();
        return Inertia::render('blood-groups/index', [
            'bloodGroups' => BloodGroupResource::collection($bloodGroups),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:blood_groups,name',
            'status' => 'boolean',
        ]);

        BloodGroup::create([
            'name' => $request->name,
            'status' => true
        ]);

        return redirect()->route('blood-groups.index')->with('success', 'Blood group added successfully.');
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255|unique:blood_groups,name,'.$id,
            'status' => 'boolean'
        ]);

        // Find the designation by ID
        $bloodGroup = BloodGroup::findOrFail($id);

        // Update the designation
        $bloodGroup->update([
            'name' => $request->input('name'),
            'status' => $request->input('status') ? 1 : 0,
        ]);

        // Redirect back with a flash success message
        return redirect()->back()->with('success', 'BloodGroup updated successfully.');
    }

    public function destroy($id){
        try {
            $bloodGroup = BloodGroup::findOrFail($id);
            $bloodGroup->delete();
            return redirect()->back()->with('success', 'Blood group deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }

    public function toggleStatus($id)
    {
        try {
            $bloodGroup = BloodGroup::findOrFail($id);
            $bloodGroup->update(['status' => !$bloodGroup->status]);
            return redirect()->back()->with('success',
            $bloodGroup->status ? 'Blood group activated.' : 'Blood group deactivated.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }
}
