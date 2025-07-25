<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (\Illuminate\Http\Request $request) {
    return $request->user();
});
