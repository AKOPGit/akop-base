@props(['id' => null, 'name', 'value'])
<div class="flex items-center gap-x-3">
    <input type="radio" id="{{ $id ?? $name.'-'.$value }}" name="{{ $name }}" value="{{ $value }}" {{ $attributes->class('relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden') }} />
    <label for="{{ $id ?? $name.'-'.$value }}" class="block text-sm font-medium leading-6 text-gray-900">{{ $slot }}</label>
</div>
