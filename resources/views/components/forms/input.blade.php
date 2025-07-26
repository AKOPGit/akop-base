@props([
    'type' => 'text',
    'iconLeft' => null,
    'iconRight' => null,
])
<div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
    @if($iconLeft)
        <x-dynamic-component :component="$iconLeft" class="size-5 text-gray-400" />
    @endif
    <input type="{{ $type }}" {{ $attributes->class(['block min-w-0 grow py-1.5 px-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm']) }} />
    @if($iconRight)
        <x-dynamic-component :component="$iconRight" class="size-5 p-0 bg-red-300 text-gray-400" />
    @endif
</div>
