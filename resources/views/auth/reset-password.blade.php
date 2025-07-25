<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
</head>
<body>
<h1>Reset Password</h1>
@if ($errors->any())
    <div>{{ implode(', ', $errors->all()) }}</div>
@endif
<form method="POST" action="{{ url('/reset-password') }}">
    @csrf
    <input type="hidden" name="token" value="{{ $token }}">
    <div>
        <label>Email</label>
        <input type="email" name="email" value="{{ old('email') }}" required>
    </div>
    <div>
        <label>Password</label>
        <input type="password" name="password" required>
    </div>
    <div>
        <label>Confirm Password</label>
        <input type="password" name="password_confirmation" required>
    </div>
    <button type="submit">Reset Password</button>
</form>
</body>
</html>
