<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompressedFile extends Model
{
    use HasFactory;
    protected $fillable = [
        'original_name',
        'compressed_name',
        'original_size',
        'compressed_size',
        'compression_ratio',
        'user_id',
    ];
}
