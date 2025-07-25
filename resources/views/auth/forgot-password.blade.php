<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forgot Password</title>
</head>
<body>
<h1>Forgot Password</h1>
@if ($errors->any())
    <div>{{ implode(', ', $errors->all()) }}</div>
@endif
@if (session('status'))
    <div>{{ session('status') }}</div>
@endif
<form method="POST" action="{{ url('/forgot-password') }}">
    @csrf
    <div>
        <label>Email</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
    </div>
    <button type="submit">Send Reset Link</button>
</form>
</body>
</html>
