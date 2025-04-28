<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\EmployeeResource;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Employee;
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
        $query = Employee::query()->orderBy('created_at', 'desc');
        $employees = $query->paginate(5)->withQueryString();
        return Inertia::render('employees/index', [
            'departments' => Department::select('id', 'name')->get(),
            'designations' => Designation::select('id', 'title')->get(),
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
            'employee_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
                'present_address',
                'permanent_address',
                'emergency_contact',
                'blood_group',
                'date_of_birth',
            ]);

            $data['status'] = $request->boolean('status'); // safer for checkbox
            $data['verify'] = $request->boolean('verify');
            $data['user_id'] = auth()->id();

            if ($request->hasFile('employee_image')) {
                $data['employee_image'] = $request->file('employee_image')->store('employee_images', 'public');
            }

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
            'employee_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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
                'status',
                'about',
            ]);

            // Handle employee_image separately
            if ($request->hasFile('employee_image')) {
                // 🔥 Delete old image if exists
                if ($employee->employee_image && Storage::disk('public')->exists($employee->employee_image)) {
                    Storage::disk('public')->delete($employee->employee_image);
                }

                // Upload new image
                $image = $request->file('employee_image');
                $path = $image->store('employee_images', 'public');
                $data['employee_image'] = $path;
            }

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
