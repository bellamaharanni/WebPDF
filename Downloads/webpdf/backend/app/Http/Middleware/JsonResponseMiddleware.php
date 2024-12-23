<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

namespace App\Http\Middleware;

use Closure;

class JsonResponseMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Hapus whitespace atau pesan error di output buffer
        if (ob_get_length()) {
            ob_end_clean();
        }

        return $response;
    }
}
