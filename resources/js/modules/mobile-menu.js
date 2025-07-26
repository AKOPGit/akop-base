export function init() {
    let triggers = document.querySelectorAll('[data-js-mobile-menu]')
    if (triggers[0]) {
        triggers.forEach((trigger) => {
            let data    = trigger.dataset.jsMobileMenu ? JSON.parse(trigger.dataset.jsMobileMenu) : {}
            let options = {
                once: data.once || false,
            }

            if (!data.mobileMenuId) {
                return false
            }

            if (trigger.eventAdded !== true) {
                trigger.addEventListener(data.event || 'click', (event) => {
                    toggleMobileMenu(data.mobileMenuId)
                }, options)
                trigger.eventAdded = true
            }
        })
    }
}

export function toggleMobileMenu(mobileMenuId) {
    let mobileMenu = document.getElementById(mobileMenuId) || null
    mobileMenu.classList.toggle('-translate-x-full')
    mobileMenu.classList.toggle('w-3/4')
    mobileMenu.classList.toggle('h-screen')
    mobileMenu.classList.toggle('h-full')
    toggleMobileMenuOverlay()
}

export function toggleMobileMenuOverlay(){
    document.querySelector('.mobile-menu-overlay').classList.toggle('hidden')
}

