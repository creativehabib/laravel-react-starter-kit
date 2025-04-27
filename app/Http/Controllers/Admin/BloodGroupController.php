<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BloodGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BloodGroupController extends Controller
{
    public function index()
    {
        $bloodGroups = BloodGroup::orderBy('created_at', 'desc')->paginate(5)->withQueryString();
        return Inertia::render('blood-groups/index', [
            'bloodGroups' => $bloodGroups,
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

        return redirect()->route('blood-groups.index')->with('success', 'Blood group added.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:blood_groups,name,' . $id
        ]);

        $bloodGroup = BloodGroup::findOrFail($id);
        $bloodGroup->update([
            'name' => $request->name,
            'status' => true
        ]);

        return redirect()->route('blood-groups.index')->with('success', 'Blood group updated successfully.');
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
