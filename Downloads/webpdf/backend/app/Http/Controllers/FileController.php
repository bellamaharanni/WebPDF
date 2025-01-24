<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    // Fungsi upload file dan kompresi
    public function upload(Request $request)
    {
        Log::info('Upload started.');

        // Validasi file yang diunggah
        $validated = $request->validate([
            'file' => 'required|mimes:pdf|max:20971520',  // Maksimal 20 GB (dalam byte)
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

                // Generate path untuk file yang dikompres
                $compressedFileName = 'compressed-' . time() . '-' . $file->hashName();
                $compressedFilePath = 'compressed/' . $compressedFileName;

                // Path file input dan output untuk kompresi
                $inputPath = storage_path('app/public/' . $filePath);
                $outputPath = storage_path('app/public/' . $compressedFilePath);

                // Menjalankan perintah Ghostscript untuk kompresi PDF
                $command = "gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile={$outputPath} {$inputPath}";
                $result = shell_exec($command . ' 2>&1');  // Capture error output
                Log::info('Ghostscript result:', ['result' => $result]);

                // Cek apakah proses kompresi berhasil
                if ($result === null) {
                    Log::info('Compression completed successfully.', ['compressed_path' => $compressedFilePath]);
                } else {
                    Log::error('Error during compression.', ['result' => $result]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Error during compression.',
                        'details' => $result,  // Kirim detail error ke frontend
                    ], 500);
                }

                // Cek ukuran file hasil kompresi
                $compressedFileSize = Storage::disk('public')->size($compressedFilePath);
                Log::info('Compressed file size:', ['size' => $compressedFileSize]);

                // Pastikan ukuran file lebih besar dari 0 byte
                if ($compressedFileSize <= 0) {
                    Log::error('Compressed file is empty.');
                    return response()->json([
                        'success' => false,
                        'message' => 'Compressed file is empty.',
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

    // Fungsi kompresi (opsional untuk kompresi spesifik dengan level)
    public function compress(Request $request)
    {
        // Validasi file dan parameter lainnya
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:pdf|max:10000', // Validasi file PDF
            'compressionLevel' => 'required|in:low,medium,high', // Validasi tingkat kompresi
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid input',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Ambil file dan tingkat kompresi
            $file = $request->file('file');
            $compressionLevel = $request->compressionLevel;

            // Proses kompresi file logika di sini...
            // Ganti dengan logika kompresi sesuai dengan level yang dipilih

            $compressedFilePath = '/path/to/compressed/file.pdf'; // Sesuaikan dengan hasil kompresi Anda

            return response()->json([
                'compressedFilePath' => $compressedFilePath,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error compressing file',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}