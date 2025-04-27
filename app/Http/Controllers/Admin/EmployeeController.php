<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::orderBy('created_at', 'desc')
            ->with(['designation', 'department'])
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('employees/index', [
            'employees' => $employees,
            'departments' => Department::all(['id', 'name']),
            'designations' => Designation::all(['id', 'title']),
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
        $validated = $request->validate([
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
        ]);

        try {
            Employee::create([
                $validated,
                'user_id' => auth()->user()->id,
            ]); // ✅ Only safe validated data
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
            'employee_image' => 'nullable|image|max:2048',
        ]);

        try {
            $employee = Employee::findOrFail($id);
            $employee->update($request->all());

            return redirect()->back()->with('success', 'Employee updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
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
