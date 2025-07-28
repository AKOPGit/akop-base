@if (session()->has('alert'))
    <script>
        Modal.loadAlert({
            type   : "success",
            content: '{{session('alert')['message']}}',
        })
    </script>
@endif

@if ($errors->any())
    <script>
        Modal.loadAlert({
            type   : "error",
            content: @foreach ($errors->all() as $error) '{{ $error }} <br>' @endforeach
        })
    </script>
@endif

@if (session()->has('toast'))
    <script>
        Toast.show()
    </script>
@endif
