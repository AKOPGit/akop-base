<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
</head>
<body>
<h1>Welcome, {{ $user->name }}</h1>
<form method="POST" action="{{ url('/logout') }}">
    @csrf
    <button type="submit">Logout</button>
</form>
</body>
</html>
