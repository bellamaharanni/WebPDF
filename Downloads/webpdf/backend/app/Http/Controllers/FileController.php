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
            'file' => 'required|mimes:pdf|max:200000',  // 20 GB
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

                // Path file input dan output untuk kompresi
                $inputPath = storage_path('app/public/' . $filePath);
                $outputPath = storage_path('app/public/' . $compressedFilePath);

                // Menjalankan perintah Ghostscript untuk kompresi PDF
                $command = "gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile={$outputPath} {$inputPath}";
                $result = shell_exec($command);

                // Cek apakah proses kompresi berhasil
                if ($result === null) {
                    Log::info('Compression completed.', ['compressed_path' => $compressedFilePath]);
                } else {
                    Log::error('Error during compression.', ['result' => $result]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Error during compression.',
                    ], 500);
                }

                // Generate URL yang bisa diakses publik
                $publicUrl = '/storage/' . $compressedFilePath;
                Log::info('Public URL generated:', ['url' => $publicUrl]);

                return response()->json([
                    'success' => true,
                    'original_name' => $originalName,
                    'compressedFilePath' => $publicUrl
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