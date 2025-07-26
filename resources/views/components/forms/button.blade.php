@props(['state' => 'idle'])
<button {{ $attributes->class('rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600') }} data-state="{{ $state }}">
    <span @class(['hidden' => ($state !== 'idle')])>{{$slot}}</span>
    <div class="animate-spin h-4 w-4 border-4 border-blue-500 rounded-full border-t-transparent"></div>
</button>
