<?php

use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\DesignationController;
use App\Http\Controllers\Admin\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // Designation Routes
    Route::resource('designations', DesignationController::class);
    Route::post('/designations/{id}/toggle-status', [DesignationController::class, 'toggleStatus'])->name('designations.toggle-status');

    // Department Routes
    Route::resource('departments', DepartmentController::class)->names('departments');
    Route::post('/departments/{id}/toggle-status', [DepartmentController::class, 'toggleStatus'])->name('departments.toggle-status');

    // Post Routes
    Route::resource('posts', PostController::class)->names('posts');
    Route::put('/posts/{id}/toggle-status', [PostController::class, 'toggleStatus'])->name('posts.toggle-status');
});
