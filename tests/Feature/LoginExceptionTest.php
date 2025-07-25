<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginExceptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_invalid_credentials_redirect_back_with_error(): void
    {
        User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->from('/login')->post('/login', [
            'email' => 'john@example.com',
            'password' => 'wrong',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHasErrors('auth');
    }

    public function test_invalid_credentials_ajax_returns_json(): void
    {
        User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('secret123'),
        ]);

        $response = $this->postJson('/login', [
            'email' => 'john@example.com',
            'password' => 'wrong',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Invalid credentials.',
        ]);
    }
}
