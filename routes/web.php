<?php

use App\Http\Controllers\MediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/nu.php';


Route::middleware('auth')->group(function () {
    Route::resource('media', MediaController::class);
    Route::post('/media-upload', [MediaController::class, 'upload']);
    Route::post('/media/{id}/update-image', [MediaController::class, 'updateImage']);
    // upload from url
    Route::post('/media-upload-from-url', [MediaController::class, 'uploadFromUrl']);
});

