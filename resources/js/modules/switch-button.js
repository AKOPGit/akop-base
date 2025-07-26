export function init() {
    let triggers = document.querySelectorAll('[data-js-switch]')
    if (triggers[0]) {
        triggers.forEach((trigger) => {
            let data    = trigger.dataset.jsSwitch ? JSON.parse(trigger.dataset.jsSwitch) : {}
            let options = {
                once: data.once || false,
            }

            if (trigger.toggleEventAdded !== true) {

                trigger.addEventListener(data.event || 'click', (event) => {
                    toggleElement(data.mainToggleClasses, data.tickerToggleClasses, data.checkName, event)
                }, options)

                trigger.toggleEventAdded = true
            }
        })
    }
}

export function toggleElement(mainToggleClasses, tickerToggleClasses, checkName, event) {

    let switchElement = event.currentTarget || null
    let switchElementTicker = switchElement.children[0]
    let checkbox = document.getElementsByName(checkName)[0]

    mainToggleClasses.forEach((toggleClass) => {
        switchElement.classList.toggle(toggleClass)
    })

    tickerToggleClasses.forEach((toggleClass) => {
        switchElementTicker.classList.toggle(toggleClass)
    })

    checkbox.checked = !checkbox.checked;

    event.cancelBubble = true
}