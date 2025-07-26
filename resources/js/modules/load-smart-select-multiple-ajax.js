import * as ajaxModule from './ajax'
import {updateSlots} from "./ajax-slot"
import {closeAllSidePanels, openSidePanel} from "./side-panel"

export function init() {
    let smartSelectAjaxTriggers = document.querySelectorAll('[data-js-load-smart-select-multiple-ajax]')
    if (smartSelectAjaxTriggers[0]) {
        smartSelectAjaxTriggers.forEach((smartSelectAjaxContainer) => {

            let data = smartSelectAjaxContainer.dataset.jsLoadSmartSelectMultipleAjax ? JSON.parse(smartSelectAjaxContainer.dataset.jsLoadSmartSelectMultipleAjax) : {}

            if (!data.route) {
                return false
            }

            let options = {
                once: data.once || false,
            }

            if (smartSelectAjaxContainer.smartSelectAjaxEventAdded !== true) {
                getSmartSelectViaAjax(smartSelectAjaxContainer,data.route);
                smartSelectAjaxContainer.smartSelectAjaxEventAdded = true
            }

        })
    }
}

export function getSmartSelectViaAjax(container,route) {

    if (route) {
        let ajaxObj = ajaxModule.init('GET', route)

        // Show some animation
        //showLoadingIconOnSubmitButton(button)

        ajaxObj.onload = function () {
            let data = ajaxObj.response

            if (ajaxObj.status === 200) {

                updateSlots(data)

            } else {
                if (data) {
                    console.dir(data)
                } else {
                    swal.fire('Alert', 'Other error', 'warning')
                }
            }

            //hideLoadingIconOnSubmitButton(button)
        }

        ajaxObj.send()
    }
}

export function disableSubmitButton(button) {
    button.setAttribute('disabled', 'disabled')
}

export function enableSubmitButton(button) {
    button.removeAttribute('disabled')
}

export function showLoadingIconOnSubmitButton(button) {


    let loadingIcon = button.getElementsByClassName('button-loading-icon')[0]
    let originalIcon = button.getElementsByClassName('button-original-icon')[0]

    if (loadingIcon) {
        loadingIcon.classList.remove('hidden')
    }
    if (originalIcon) {
        originalIcon.classList.add('hidden')
    }
}

export function hideLoadingIconOnSubmitButton(button) {

    let loadingIcon = button.getElementsByClassName('button-loading-icon')[0]
    let originalIcon = button.getElementsByClassName('button-original-icon')[0]

    if (loadingIcon) {
        loadingIcon.classList.add('hidden')
    }

    if (originalIcon) {
        originalIcon.classList.remove('hidden')
    }
}