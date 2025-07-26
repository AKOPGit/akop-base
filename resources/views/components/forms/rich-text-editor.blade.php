@props(['name', 'id' => null, 'value' => ''])
@php use Illuminate\Support\Str; @endphp
@php
    $id = $id ?? Str::uuid()->toString();
@endphp
<div id="{{ $id }}" data-rich-text-editor class="bg-white p-2 border border-gray-300 rounded-md">
    <div class="toolbar flex flex-wrap gap-1 mb-2 text-gray-600">
        <select data-command="heading" class="toolbar-item text-sm">
            <option value="0">Parágrafo</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
        </select>
        <button type="button" data-command="bold" class="toolbar-item font-bold">B</button>
        <button type="button" data-command="italic" class="toolbar-item italic">I</button>
        <button type="button" data-command="strike" class="toolbar-item line-through">S</button>
        <button type="button" data-command="underline" class="toolbar-item underline">U</button>
        <button type="button" data-command="bullet" class="toolbar-item">•</button>
        <button type="button" data-command="ordered" class="toolbar-item">1.</button>
        <button type="button" data-command="blockquote" class="toolbar-item">"</button>
        <button type="button" data-command="code" class="toolbar-item">{ }</button>
        <button type="button" data-command="link" class="toolbar-item">🔗</button>
        <button type="button" data-command="align-left" class="toolbar-item">⬅</button>
        <button type="button" data-command="align-center" class="toolbar-item">↔</button>
        <button type="button" data-command="align-right" class="toolbar-item">➡</button>
        <button type="button" data-command="undo" class="toolbar-item">↶</button>
        <button type="button" data-command="redo" class="toolbar-item">↷</button>
    </div>
    <div class="editor min-h-[100px] outline-none"></div>
</div>
<input type="hidden" name="{{ $name }}" value="{{ $value }}" data-editor-target="{{ $id }}">
