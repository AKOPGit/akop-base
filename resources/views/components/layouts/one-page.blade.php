@props(['title' => 'My Site'])
    <!DOCTYPE html>
<html lang="en" class="h-full bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title }}</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="h-full flex flex-col font-sans">
        <header class="bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 backdrop-blur">
            <nav class="container mx-auto flex items-center justify-between p-4">
                <span class="text-xl font-bold">MyCompany</span>
                <ul class="hidden md:flex items-center gap-6">
                    <li><a href="#" class="hover:text-blue-600">Home</a></li>
                    <li><a href="#" class="hover:text-blue-600">Blog</a></li>
                    <li><a href="#" class="hover:text-blue-600">Contato</a></li>
                    <li><a href="#sobre" class="hover:text-blue-600">Sobre</a></li>
                    <li class="relative">
                        <button
                            ak-toggle="topics-dropdown"
                            ak-toggle-classes="hidden"
                            ak-toggle-close-on-blur="true"
                            class="flex items-center gap-1 hover:text-blue-600 focus:outline-none"
                        >
                            Assuntos
                            <x-heroicon-o-chevron-down class="w-4 h-4"/>
                        </button>
                        <ul id="topics-dropdown"
                            class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg hidden">
                            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Item 1</a>
                            </li>
                            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Item 2</a>
                            </li>
                            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Item 3</a>
                            </li>
                            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Item 4</a>
                            </li>
                            <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Item 5</a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div class="flex items-center gap-4">
                    <button id="menu-toggle" class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none">
                        <x-heroicon-o-bars-3 class="w-6 h-6"/>
                    </button>
                    <button id="theme-switch"
                            class="flex items-center text-gray-600 dark:text-gray-300 focus:outline-none">
                        <x-heroicon-o-moon class="w-6 h-6 dark:hidden"/>
                        <x-heroicon-o-sun class="w-6 h-6 hidden dark:inline"/>
                    </button>
                </div>
            </nav>
        </header>

        <div id="menu-overlay" class="fixed inset-0 bg-black/50 hidden z-40 md:hidden"></div>
        <aside id="menu-panel"
               class="fixed top-0 right-0 h-full w-1/2 bg-white dark:bg-gray-800 transform translate-x-full transition-transform duration-200 z-50 p-6 space-y-4 md:hidden">
            <ul class="space-y-2">
                <li><a href="#" class="block py-2 border-b border-gray-200 dark:border-gray-700">Home</a></li>
                <li><a href="#" class="block py-2 border-b border-gray-200 dark:border-gray-700">Blog</a></li>
                <li><a href="#" class="block py-2 border-b border-gray-200 dark:border-gray-700">Contato</a></li>
                <li><a href="#sobre" class="block py-2 border-b border-gray-200 dark:border-gray-700">Sobre</a></li>
                <li>
                    <span class="block py-2 font-semibold">Assuntos</span>
                    <ul class="ml-4 space-y-1">
                        <li><a href="#" class="block py-1">Item 1</a></li>
                        <li><a href="#" class="block py-1">Item 2</a></li>
                        <li><a href="#" class="block py-1">Item 3</a></li>
                        <li><a href="#" class="block py-1">Item 4</a></li>
                        <li><a href="#" class="block py-1">Item 5</a></li>
                    </ul>
                </li>
            </ul>
        </aside>

        <main class="flex-grow">
            <!-- Hero -->
            <section class="relative py-20 bg-gray-50 dark:bg-gray-800 -z-10">
                <div class="container mx-auto px-4 text-center">
                    <h1 class="text-4xl font-extrabold mb-4">Bem-vindo ao nosso site</h1>
                    <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">Uma pagina simples inspirada
                        em exemplos modernos de marketing com suporte a modo escuro.</p>
                    <a href="#sobre"
                       class="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Saiba
                        mais</a>
                </div>
            </section>
            <!-- About -->
            <section id="sobre" class="py-20 container mx-auto px-4">
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 class="text-3xl font-bold mb-4">Sobre nós</h2>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">Construímos experiências digitais leves e
                            acessíveis. Este layout usa Tailwind CSS para oferecer um visual limpo e responsivo.</p>
                        <p class="text-gray-600 dark:text-gray-300">Explore componentes reutilizáveis e o modo
                            claro/escuro para personalizar sua aplicação.</p>
                    </div>
                    <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </section>
        </main>
        <footer class="bg-gray-100 dark:bg-gray-800 text-center p-4">
            &copy; {{ date('Y') }} MyCompany. Todos os direitos reservados.
        </footer>
    </body>
</html>
