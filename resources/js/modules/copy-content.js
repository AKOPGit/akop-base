/*------------------------------------------------
    On init() just copies the content
    from an Element to another
-------------------------------------------------*/
export function init() {
    let copyContentTriggers = document.querySelectorAll('[data-js-copy-content]')
    if (copyContentTriggers[0]) {
        copyContentTriggers.forEach((trigger) => {

            let data = trigger.dataset.jsCopyContent ? JSON.parse(trigger.dataset.jsCopyContent) : {}

            let options = {
                once: data.once || false,
            }

            if (!data.fromId) {
                return false
            }

            let copyFrom = document.getElementById(data.fromId)
            trigger.innerHTML = copyFrom.innerHTML
            trigger.eventAdded = true
        })
    }
}