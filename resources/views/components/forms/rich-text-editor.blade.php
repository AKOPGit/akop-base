@props(['name', 'id' => null, 'value' => ''])
@php use Illuminate\Support\Str; @endphp
@php
    $id = $id ?? Str::uuid()->toString();
@endphp
<div id="{{ $id }}" data-rich-text-editor class="bg-white p-2 border border-gray-300 rounded-md">
    <div class="toolbar flex flex-wrap gap-1 mb-2">
        <select data-command="heading" class="border rounded p-1 text-sm">
            <option value="0">Parágrafo</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
        </select>
        <button type="button" data-command="bold" class="px-1 font-bold">B</button>
        <button type="button" data-command="italic" class="px-1 italic">I</button>
        <button type="button" data-command="strike" class="px-1 line-through">S</button>
        <button type="button" data-command="underline" class="px-1 underline">U</button>
        <button type="button" data-command="bullet" class="px-1">•</button>
        <button type="button" data-command="ordered" class="px-1">1.</button>
        <button type="button" data-command="blockquote" class="px-1">"</button>
        <button type="button" data-command="code" class="px-1">{ }</button>
        <button type="button" data-command="link" class="px-1">🔗</button>
        <button type="button" data-command="align-left" class="px-1">⬅</button>
        <button type="button" data-command="align-center" class="px-1">↔</button>
        <button type="button" data-command="align-right" class="px-1">➡</button>
        <button type="button" data-command="undo" class="px-1">↶</button>
        <button type="button" data-command="redo" class="px-1">↷</button>
    </div>
    <div class="editor min-h-[100px] outline-none"></div>
</div>
<input type="hidden" name="{{ $name }}" value="{{ $value }}" data-editor-target="{{ $id }}">
