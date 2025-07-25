<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<h1 class="flex items-center gap-2 text-xl font-bold"><x-heroicon-o-key class="w-6 h-6 text-gray-500"/> Login</h1>
@if ($errors->any())
    <div>{{ implode(', ', $errors->all()) }}</div>
@endif
<form method="POST" action="{{ url('/login') }}">
    @csrf
    <div>
        <label>Email</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
    </div>
    <div>
        <label>Password</label>
        <input type="password" name="password" required>
    </div>
    <div>
        <label>
            <input type="checkbox" name="remember"> Remember me
        </label>
    </div>
    <button type="submit">Login</button>
</form>
<a href="{{ url('/forgot-password') }}">Forgot your password?</a>
</body>
</html>
