<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompressedFileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Ini adalah rute yang digunakan untuk aplikasi berbasis web. Pastikan
| bahwa rute ini memiliki tampilan atau antarmuka HTML.
|
*/

Route::resource('compressed-files', CompressedFileController::class);