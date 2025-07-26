export function init() {
    const toggle = document.getElementById('menu-toggle');
    const panel = document.getElementById('menu-panel');
    const overlay = document.getElementById('menu-overlay');
    if (!toggle || !panel || !overlay) return;

    const close = () => {
        panel.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    toggle.addEventListener('click', () => {
        panel.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    });
    overlay.addEventListener('click', close);
}
