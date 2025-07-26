export function init() {
    let focusTriggers = document.querySelectorAll('[data-js-focus]')
    if (focusTriggers[0]) {
        focusTriggers.forEach((focusTrigger) => {
            let data    = focusTrigger.dataset.jsFocus ? JSON.parse(focusTrigger.dataset.jsFocus) : {}
            let target  = document.getElementById(data.targetId) || focusTrigger
            let event   = data.event || 'click'
            let timeout = data.timeout || 250
            let options = {
                once: data.once || false,
            }

            if (target === focusTrigger) {
                return focusAndMoveCursorToEnd(target, timeout)
            }

            if (focusTrigger.focusEventAdded !== true) {
                focusTrigger.addEventListener(event, (event) => {
                    focusAndMoveCursorToEnd(target, timeout)
                }, options)
                focusTrigger.focusEventAdded = true
            }
        })
    }
}

export function focusAndMoveCursorToEnd(element, timeout) {

    setTimeout(() => {
        console.log('focus')
        element.focus()
    },timeout)

    if (typeof element.selectionStart === 'number') {
        element.selectionStart = element.selectionEnd = element.value.length
    } else if (typeof element.createTextRange !== 'undefined') {
        let range = element.createTextRange()
        range.collapse(false)
        range.select()
    }
}
