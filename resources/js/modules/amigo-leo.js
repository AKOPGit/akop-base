import * as ajaxModule from './ajax'

export default window.AmigoLeo = {
    searchLoading() {
        let searchContainer = document.getElementById('search-container')
        let loadingMessage  = document.getElementById('loading-message')

        loadingMessage.classList.remove('opacity-0', '-z-10', 'translate-y-full', 'animate-pulse');
        loadingMessage.querySelector('img').classList.add('animate-pulse');
        searchContainer.classList.add('-translate-y-[250%]');
    },
    showVoucherReturn() {
        let voucherReturn = document.getElementById('show-voucher')
        let loadingMessage  = document.getElementById('loading-message')

        loadingMessage.classList.add('opacity-0', '-z-10', 'translate-y-full', 'animate-pulse');
        voucherReturn.classList.remove('opacity-0', '-z-10', 'translate-y-full', 'animate-pulse');
    },
    showVoucherInput() {
        let searchContainer = document.getElementById('search-container')
        let voucherReturn = document.getElementById('show-voucher')
        let loadingMessage  = document.getElementById('loading-message')

        searchContainer.classList.remove('-translate-y-[250%]');
        loadingMessage.classList.add('opacity-0', '-z-10', 'translate-y-full', 'animate-pulse');
        voucherReturn.classList.add('opacity-0', '-z-10', 'translate-y-full', 'animate-pulse');
    }
}
