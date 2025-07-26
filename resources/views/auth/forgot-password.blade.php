<x-layouts.form title="Forgot Password">
    <h1 class="text-xl font-bold">Forgot Password</h1>
    @if ($errors->any())
        <div>{{ implode(', ', $errors->all()) }}</div>
    @endif
    @if (session('status'))
        <div>{{ session('status') }}</div>
    @endif
    <form method="POST" action="{{ url('/forgot-password') }}" class="mt-6 space-y-6">
        @csrf
        <div>
            <x-forms.label for="email">Email</x-forms.label>
            <x-forms.input id="email" name="email" type="email" value="{{ old('email') }}" />
        </div>
        <x-forms.button type="submit">Send Reset Link</x-forms.button>
    </form>
</x-layouts.form>
