<x-layouts.form title="Register">
    <h1 class="flex items-center gap-2 text-xl font-bold"><x-heroicon-o-key class="w-6 h-6 text-gray-500"/> Register</h1>
    @if ($errors->any())
        <div>{{ implode(', ', $errors->all()) }}</div>
    @endif
    <form method="POST" action="{{ url('/register') }}" class="mt-6 space-y-6">
        @csrf
        <div>
            <x-forms.label for="name">Name</x-forms.label>
            <x-forms.input id="name" name="name" value="{{ old('name') }}"/>
        </div>
        <div>
            <x-forms.label for="email">Email</x-forms.label>
            <x-forms.input id="email" name="email" type="email" value="{{ old('email') }}"/>
        </div>
        <div>
            <x-forms.label for="password">Password</x-forms.label>
            <x-forms.input id="password" name="password" type="password"/>
        </div>
        <div>
            <x-forms.label for="password_confirmation">Confirm Password</x-forms.label>
            <x-forms.input id="password_confirmation" name="password_confirmation" type="password"/>
        </div>
        <div class="flex items-center justify-between">
            <a href="{{ url('/login') }}" class="text-sm font-semibold text-gray-900">Already have an account?</a>
            <x-forms.button type="submit">Register</x-forms.button>
        </div>
    </form>
</x-layouts.form>
