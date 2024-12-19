<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        Log::info('Upload started.');

        $validated = $request->validate([
            'file' => 'required|mimes:pdf|max:20480',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            Log::info('File received:', ['name' => $originalName]);

            try {
                // Simpan file original di folder uploads
                $filePath = $file->store('uploads', 'public');
                Log::info('File saved successfully.', ['path' => $filePath]);

                // Buat folder compressed jika belum ada
                if (!Storage::disk('public')->exists('compressed')) {
                    Storage::disk('public')->makeDirectory('compressed');
                }

                // Generate path untuk file yang dikompress
                $compressedFileName = 'compressed-' . time() . '-' . $file->hashName();
                $compressedFilePath = 'compressed/' . $compressedFileName;

                // Copy file ke folder compressed
                Storage::disk('public')->copy($filePath, $compressedFilePath);
                Log::info('Compression completed.', ['compressed_path' => $compressedFilePath]);

                // Generate URL yang bisa diakses publik
                $publicUrl = '/storage/' . $compressedFilePath;
                Log::info('Public URL generated:', ['url' => $publicUrl]);

                return response()->json([
                    'success' => true,
                    'original_name' => $originalName,
                    'file_path' => $publicUrl
                ]);
            } catch (\Exception $e) {
                Log::error('Error during file processing.', ['error' => $e->getMessage()]);
                return response()->json([
                    'success' => false,
                    'message' => 'File processing failed: ' . $e->getMessage(),
                ], 500);
            }
        } else {
            Log::error('No file received.');
            return response()->json([
                'success' => false,
                'message' => 'No file received.',
            ], 400);
        }
    }
}