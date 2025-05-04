<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\EmployeeResource;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Employee;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::select('id', 'name')->get();
        $designations = Designation::select('id', 'title')->get();
        $media = Media::select('id', 'name', 'filename', 'path')->get();

        $employees = Employee::with(['department', 'designation', 'media'])
            ->orderBy('created_at', 'desc')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('employees/index', [
            'departments' => $departments,
            'designations' => $designations,
            'media' => $media,
            'employees' => EmployeeResource::collection($employees),
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
//        dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'position' => 'nullable|string|max:255',
            'about' => 'nullable|string',
            'department_id' => 'nullable|integer',
            'designation_id' => 'nullable|integer',
            'status' => 'nullable|boolean',
            'phone' => 'nullable|string|max:20',
            'present_address' => 'nullable|string',
            'permanent_address' => 'nullable|string',
            'emergency_contact' => 'nullable|string|max:20',
            'blood_group' => 'nullable|string|max:5',
            'date_of_birth' => 'nullable|date',
            'joining_date' => 'nullable|date',
            'media_id' => 'nullable|integer',
            'pf_number' => 'nullable|string|max:255',
            'bank_account_number' => 'nullable|string|max:255',
            'bank_name' => 'nullable|string|max:255',
            'verify' => 'nullable|boolean',
        ]);

        try {
            $data = $request->only([
                'name',
                'email',
                'position',
                'about',
                'department_id',
                'designation_id',
                'status',
                'phone',
                'joining_date',
                'pf_number',
                'bank_account_number',
                'bank_name',
                'verify',
                'media_id',
                'present_address',
                'permanent_address',
                'emergency_contact',
                'blood_group',
                'date_of_birth',
            ]);

            $data['status'] = $request->boolean('status');
            $data['user_id'] = auth()->id();

            Employee::create($data);

            return redirect()->back()->with('success', 'Employee created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong! ' . $e->getMessage());
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
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $id,
            'phone' => 'nullable|string|max:15',
            'present_address' => 'nullable|string|max:255',
            'permanent_address' => 'nullable|string|max:255',
            'emergency_contact' => 'nullable|string|max:15',
            'blood_group' => 'nullable|string|max:5',
            'date_of_birth' => 'nullable|date',
            'joining_date' => 'nullable|date',
            'media_id' => 'nullable|integer',
        ]);

        try {
            $employee = Employee::findOrFail($id);

            $data = $request->only([
                'name',
                'email',
                'phone',
                'present_address',
                'permanent_address',
                'emergency_contact',
                'blood_group',
                'date_of_birth',
                'joining_date',
                'department_id',
                'designation_id',
                'position',
                'bank_account_number',
                'bank_name',
                'pf_number',
                'media_id',
                'status',
                'about',
                'verify',
            ]);

            $employee->update($data);

            return redirect()->back()->with('success', 'Employee updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $employee = Employee::findOrFail($id);
            $employee->delete();
            return redirect()->back()->with('success', 'Employee deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }
    /**
     * Toggle the status of the employee.
     */
    public function toggleStatus(Request $request, $id)
    {
        try {
            $employee = Employee::findOrFail($id);
            $employee->update(['status' => !$employee->status]);
            return redirect()->back()->with('success',
                $employee->status ? 'Employee activated.' : 'Employee deactivated.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }
}
