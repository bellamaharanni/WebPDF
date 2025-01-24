<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class JsonResponseMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Hapus whitespace atau pesan error di output buffer
        if (ob_get_length()) {
            ob_end_clean();
        }

        // Ensure the response is in JSON format
        if ($response instanceof \Illuminate\Http\Response) {
            $response->headers->set('Content-Type', 'application/json');
        }

        return $response;
    }
}