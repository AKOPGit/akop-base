import {getURLWithoutSearchParams} from "./search-params"
import {updateSlots} from "./ajax-slot"
import * as ajaxModule from './ajax'

export function init() {
    let filterTriggers = document.querySelectorAll('[data-js-execute-filters]')
    if (filterTriggers[0]) {
        filterTriggers.forEach((trigger) => {

            let data = trigger.dataset.jsExecuteFilters ? JSON.parse(trigger.dataset.jsExecuteFilters) : {}

            if (data.clearFilters === true) {
                if (trigger.clearFiltersEventAdded !== true) {
                    trigger.addEventListener(data.event || 'click', (event) => {
                            clearFiltersAndSubmit()
                    }, {once: true})
                    trigger.clearFiltersEventAdded = true
                    return
                }
            }

            if (data.clearOneFilter === true) {
                if (trigger.clearOneFilterEventAdded !== true) {
                    trigger.addEventListener(data.event || 'click', (event) => {
                        clearOneFilter(data.filterName)
                    }, {once: true})
                    trigger.clearOneFilterEventAdded = true
                    return
                }
            }

            if (!data.formId) {
                return false
            }

            let options = {
                once: data.once || false,
            }

            if (trigger.filtersEventAdded !== true) {

                trigger.addEventListener(data.event || 'click', (event) => {

                    if (data.event === 'keypress' || data.event === 'keyup') {
                        let key = event.key
                        if (key === 13 || key === 'Enter') {
                            executeFilters(data.formId, data.url, event)
                        }
                    } else {
                        executeFilters(data.formId, data.url, event)
                    }

                }, options)
                trigger.filtersEventAdded = true
            }
        })
    }
}

export function executeFilters(formId, url, e) {

    let form = document.getElementById(formId) || false

    if (form) {

        let formData         = new FormData(form)
        let filteredFormData = new FormData()

        for (let [key, value] of formData.entries()) {
            if (key.startsWith('filter')) {
                filteredFormData.append(key, value)
            }
        }

        if (!filteredFormData.entries().next().done) {

            let browserSearchParams = new URLSearchParams(location.search)
            browserSearchParams     = clearFiltersAndReturn(browserSearchParams)

            let filterQuery = new URLSearchParams(filteredFormData)

            for (let [key, value] of filterQuery.entries()) {
                browserSearchParams.append(key, value)
            }

            let newUrl = getURLWithoutSearchParams() + '?' + browserSearchParams.toString()
            history.replaceState(null, null, newUrl)
            applyFilters(browserSearchParams, url)
            e.stopPropagation()
        }
    }
}

export function clearOneFilterAndReturn(searchParamsObject, filterName) {
    for (let [key, value] of searchParamsObject.entries()) {
        if (key === filterName) {
            searchParamsObject.delete(key)
        }
    }
    return searchParamsObject
}

export function clearFiltersAndReturn(searchParamsObject) {
    let newSearchParamsObject = new URLSearchParams()
    for (let [key, value] of searchParamsObject.entries()) {

        if (!key.startsWith('filter')) {
            newSearchParamsObject.append(key, value)
        }

        if (key.startsWith('page')){
            newSearchParamsObject.delete('page')
        }

    }
    return newSearchParamsObject
}

export function clearFiltersAndSubmit() {
    let filterQuery = new URLSearchParams(location.search)

    filterQuery = clearFiltersAndReturn(filterQuery)

    window.location.search = filterQuery
}

export function clearOneFilter(filterName) {
    let filterQuery = new URLSearchParams(location.search)

    filterQuery = clearOneFilterAndReturn(filterQuery, filterName)

    window.location.search = filterQuery
}

export function applyFilters(formData, url) {
    let searchParams = new URLSearchParams(formData)
    let ajaxObj      = ajaxModule.init('GET', url + '?' + searchParams)
    ajaxObj.onload   = function () {
        let data = ajaxObj.response

        if (ajaxObj.status === 200) {
            updateSlots(data)
        } else if (ajaxObj.status === 422) {
            alert('422 error')
        } else {
            alert('Some other error')
        }
    }
    ajaxObj.send()
}
