<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    // Tambahkan method upload di dalam class Controller
    public function upload(Request $request)
{
    $request->validate([
        'file' => 'required|mimes:pdf|max:20480',
    ]);

    if ($request->file('file')) {
        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('public/compressed', $filename);

        return response()->json([
            'filePath' => asset('storage/compressed/' . $filename),
        ], 200);
    }

    return response()->json(['message' => 'File upload failed'], 400);
}

}
