<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\CompressedFileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Ini adalah rute yang digunakan untuk layanan API. Biasanya digunakan
| untuk komunikasi dengan front-end modern seperti React, Vue, atau
| aplikasi mobile.
|
*/

// Rute untuk upload dan kompres file
Route::post('/compress', [FileController::class, 'upload']);

// Resource controller untuk compressed_files
Route::resource('compressed-files', CompressedFileController::class);

// Contoh endpoint untuk mengambil user (dengan autentikasi sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Endpoint untuk meng-upload file PDF
use Illuminate\Support\Facades\Storage;

Route::post('/upload-pdf', function (Request $request) {
    if (!$request->hasFile('file')) {
        return response()->json(['message' => 'File tidak ditemukan.'], 400);
    }

    $file = $request->file('file');
    $path = $file->store('public/compressed'); // Simpan di folder storage/app/public/compressed
    $url = Storage::url($path); // Dapatkan URL file yang disimpan

    return response()->json(['file_path' => $url]);
});