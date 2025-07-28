<div id="toast-container" aria-live="assertive" class="pointer-events-none fixed inset-x-0 bottom-0 px-4 py-6 sm:p-6 flex flex-col items-center space-y-4">
    <div id="toast-template" class="hidden opacity-0 transition-all duration-300 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div data-timer class="transition-all duration-200 bg-red-300 w-full h-0.5"></div>
        <div class="p-4">
            <div class="flex items-start">

                <div class="flex-shrink-0 pt-1">
                    <x-heroicon-s-check-circle data-icon-success class="h-6 w-6 text-green-500/90" />
                    <x-heroicon-s-check-circle data-icon-error class="h-6 w-6 text-red-500/90" />
                    <x-heroicon-s-check-circle data-icon-warning class="h-6 w-6 text-amber-500/90" />
                    <x-heroicon-s-check-circle data-icon-info class="h-6 w-6 text-blue-500/90" />
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="font-medium text-gray-800" data-slot="title"></p>
                    <p class="mt-1 text-sm text-gray-500" data-slot="content"></p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                    <button type="button" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span class="sr-only">Fechar</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
