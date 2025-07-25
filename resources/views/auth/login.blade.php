<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
<h1>Login</h1>
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
