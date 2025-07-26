@props(['title' => null])
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="p-6">
    <div class="mx-auto max-w-xl">
        {{ $slot }}
    </div>
</body>
</html>
