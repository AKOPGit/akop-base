// Navigation scroll verification (nav menu opacity)
export function init() {
    let jsNavScrollCheck = document.querySelectorAll('.js-nav-scroll-check')
    if (jsNavScrollCheck[0]) {
        jsNavScrollCheck.forEach((target) => {
            toggleTopNavOpacity(target)
            document.addEventListener('scroll', () => {
                toggleTopNavOpacity(target)
            })
        })
    }

    let jsModuleTitleScroll = document.querySelectorAll('.js-title-scroll')
    if (jsModuleTitleScroll[0]) {
        jsModuleTitleScroll.forEach((target) => {
            document.addEventListener('scroll', () => {
                if (hasReachedTop(target)) {
                    target.classList.add('z-10', 'w-full', 'bg-white')
                } else {
                    target.classList.remove('z-10', 'w-full', 'bg-white')
                }
            })
        })
    }
}

export function hasReachedTop(target){
    return window.pageYOffset > target.offsetHeight;
}

export function toggleTopNavOpacity(target) {
    let currentYPosition = window.pageYOffset
    if (currentYPosition >= 50 && !target.classList.contains('bg-slate-700')) {
        target.classList.add('bg-slate-700')
        target.setAttribute('style', 'transition: background-color 0.3s ease;')
    } else if (currentYPosition < 50 && target.classList.contains('bg-slate-700')) {
        target.classList.remove('bg-slate-700')
        target.setAttribute('style', 'background-color:rgba(0,0,0,0.25);transition: background-color 0.5s ease;')
    }
}

