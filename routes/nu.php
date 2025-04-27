<?php

use App\Http\Controllers\Admin\BloodGroupController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\DesignationController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // Designation Routes
    Route::resource('designations', DesignationController::class);
    Route::post('/designations/{id}/toggle-status', [DesignationController::class, 'toggleStatus'])->name('designations.toggle-status');

    // Department Routes
    Route::resource('departments', DepartmentController::class)->names('departments');
    Route::post('/departments/{id}/toggle-status', [DepartmentController::class, 'toggleStatus'])->name('departments.toggle-status');

    // Employee Routes
    Route::resource('employees', EmployeeController::class)->names('employees');
    Route::post('/employees/{id}/toggle-status', [EmployeeController::class, 'toggleStatus'])->name('employees.toggle-status');
    Route::post('/employees/{id}/toggle-verify', [EmployeeController::class, 'toggleVerify'])->name('employees.toggle-verify');

    // Post Routes
    Route::resource('posts', PostController::class)->names('posts');
    Route::put('/posts/{id}/toggle-status', [PostController::class, 'toggleStatus'])->name('posts.toggle-status');

    // Blood Group Routes
    Route::resource('blood-groups', BloodGroupController::class)->names('blood-groups');
    Route::post('/blood-groups/{id}/toggle-status', [BloodGroupController::class, 'toggleStatus'])->name('blood-groups.toggle-status');
});
