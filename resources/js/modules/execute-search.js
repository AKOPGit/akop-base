import {applyFilters} from "./execute-filters"
import {getURLWithoutSearchParams} from "./search-params"

export function init() {
    let searchTriggers = document.querySelectorAll('[data-js-execute-search]')
    if (searchTriggers[0]) {
        searchTriggers.forEach((trigger) => {

            let data = trigger.dataset.jsExecuteSearch ? JSON.parse(trigger.dataset.jsExecuteSearch) : {}

            /*if (data.clearSearch === true) {
                if (trigger.clearSearchEventAdded !== true) {
                    trigger.addEventListener(data.event || 'click', (event) => {
                        clearSearch()
                    }, {once: true})
                    trigger.clearSearchEventAdded = true
                    return;
                }
            }*/

            let options = {
                once: data.once || false,
            }

            if (!data.inputId || !data.event) {
                return false
            }

            if (trigger.searchEventAdded !== true) {

                trigger.addEventListener(data.event, (event) => {

                    if (data.event === 'keypress' || data.event === 'keyup') {
                        executeSearchOnEnterPress(data.inputId, data.url, event)
                    }

                    if (data.event === 'click' || data.event === 'mousedown') {
                        executeSearchOnClick(data.inputId, data.url, event)
                    }

                }, options)
                trigger.searchEventAdded = true
            }
        })
    }
}

export function longEnough(searchTerms, input) {
    if (searchTerms.length < 3) {
        input.value = ''
        input.classList.add('animate-pulse-once')
        input.setAttribute('placeholder', 'Digite 3 ou mais caracteres para usar a busca')

        setTimeout(function () {
            input.classList.remove('animate-pulse-once')
        }, 3000)
    }
    return !!(searchTerms && searchTerms.length >= 3)
}

export function disableInputField(target) {
    target.setAttribute('disabled', 'disabled')
}

export function enableInputField(target) {
    target.removeAttribute('disabled')
}

export function executeSearchOnEnterPress(inputId, url, e) {
    let input = document.getElementById(inputId) || false

    if (input) {
        let key = e.key || e.which || e.keyCode
        if (key === 13 || key === 'Enter') {
            let searchTerms = input.value
            if (longEnough(searchTerms, input)) {
                sendSearchToBrowser(input, url, e)
            }
        }
    }

}

export function executeSearchOnClick(inputId, url, e) {
    let input = document.getElementById(inputId) || false

    if (input) {
        let searchTerms = input.value

        if (!longEnough(searchTerms, input)) {
            e.preventDefault()
        }

        if (longEnough(searchTerms, input)) {
            sendSearchToBrowser(input, url, e)
        }
    }
}

export function sendSearchToBrowser(input, url, e){
    disableInputField(input)
    let browserSearchParams = new URLSearchParams(location.search)

    let newUrl = getURLWithoutSearchParams() + '?' + browserSearchParams.toString()
    history.replaceState(null, null, newUrl)
    applyFilters(browserSearchParams, url)
    //window.location.search = browserSearchParams
    enableInputField(input)
    e.stopPropagation()
}

/*export function clearSearch() {
    let searchQuery = new URLSearchParams(location.search)
    searchQuery.delete('s')
    window.location.search = searchQuery
}*/
