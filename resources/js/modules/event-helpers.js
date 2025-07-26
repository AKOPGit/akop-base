export function init() {
    let fireClickEvents = document.querySelectorAll('.js-fire-click-on-enter')
    if (fireClickEvents[0]) {
        fireClickEvents.forEach((fireClickEvent) => {
            fireClickEvent.addEventListener('keypress', (event) => {
                if (event.key === 'Enter' || event.which === 13) {
                    event.preventDefault()
                    let target = document.getElementById(fireClickEvent.dataset.targetId)
                    return target.click()
                }
            }, false)
        })
    }
}
