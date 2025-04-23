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
        return Inertia::render('blood-groups/index', [
            'bloodGroups' => BloodGroup::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:blood_groups,name'
        ]);

        BloodGroup::create([
            'name' => $request->name,
            'status' => true
        ]);

        return redirect()->route('blood-groups.index')->with('success', 'Blood group added.');
    }

    public function toggleStatus($id)
    {
        $bloodGroup = BloodGroup::findOrFail($id);
        $bloodGroup->update(['status' => !$bloodGroup->status]);

        return redirect()->route('blood-groups.index')->with('success', 'Status updated.');
    }
}
