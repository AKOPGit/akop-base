import {doSearchInContainer} from "./search-in-container"

export function init() {
    let smartSelectTriggers = document.querySelectorAll('[data-js-smart-select]')
    if (smartSelectTriggers[0]) {
        smartSelectTriggers.forEach((trigger) => {

            let data = trigger.dataset.jsSmartSelect ? JSON.parse(trigger.dataset.jsSmartSelect) : {}

            if (!data.searchContainerId || !data.event) {
                return false
            }

            let options = {
                once: data.once || false,
            }

            if (trigger.smartSelectEventAdded !== true) {

                let searchContainer = document.getElementById(data.searchContainerId)

                let radioButtons = searchContainer.querySelectorAll('[data-js-smart-select-radio]')
                if (radioButtons[0]) {
                    radioButtons.forEach((radioButton) => {
                        if (radioButton.selectItemEventAdded !== true) {
                            radioButton.addEventListener('click', (event) => {
                                selectItem(trigger, radioButton, searchContainer.id)
                            }, {once: false})
                            radioButton.selectItemEventAdded = true
                        }
                    })
                }

                let searchInput = searchContainer.querySelector('[data-js-smart-select-search-input]')
                if (searchInput) {
                    if (searchInput.searchEventAdded !== true) {
                        searchInput.addEventListener('keyup', (event) => {
                            doSearchInContainer(searchContainer.id, searchInput.value)
                        }, {once: false})
                        searchInput.searchEventAdded = true
                    }
                }

                let closeButton = searchContainer.querySelector('[data-js-smart-select-close]')
                if (closeButton) {
                    if (closeButton.closeEventAdded !== true) {
                        closeButton.addEventListener('click', (event) => {
                            closeSearchContainer(trigger, searchContainer.id)
                        }, {once: false})
                        closeButton.closeEventAdded = true
                    }
                }

                trigger.addEventListener(data.event, (event) => {
                    openSearchContainer(trigger, searchContainer.id)
                }, options)
                trigger.smartSelectEventAdded = true
            }
        })
    }
}

export function openSearchContainer(trigger, searchContainerId) {

    let searchContainer  = document.getElementById(searchContainerId)
    let searchInput      = searchContainer.querySelector('[id$=-search-input]')
    let triggerArrowIcon = trigger.querySelector('[id$=-trigger-arrow-icon]')

    if (triggerArrowIcon) {
        triggerArrowIcon.classList.toggle('rotate-90')
    }

    searchContainer.classList.remove('hidden')
    searchContainer.classList.add('animate-fade-in-fast')
    searchInput.focus()
}

export function closeSearchContainer(trigger, searchContainerId) {
    let searchContainer  = document.getElementById(searchContainerId)
    let searchInput      = searchContainer.querySelector('[id$=-search-input]')
    let triggerArrowIcon = trigger.querySelector('[id$=-trigger-arrow-icon]')

    if (triggerArrowIcon) {
        triggerArrowIcon.classList.remove('rotate-90')
    }

    searchContainer.classList.add('animate-fade-out', 'hidden')
    searchInput.value = ''
    searchInput.dispatchEvent(new KeyboardEvent('keyup', {'key': 'space'}))
}

export function selectItem(selectedItemTargetContainer, markedRadio, searchContainerId) {
    let searchContainer = document.getElementById(searchContainerId)
    let itemsList       = searchContainer.querySelector('[id$=items-list]')

    putOldSelectedItemBackToList(selectedItemTargetContainer, itemsList)

    let markedRadioParentId = markedRadio.dataset.radioParentId
    let markedRadioParent = document.getElementById(markedRadioParentId) || false
    if (markedRadioParent){
        selectedItemTargetContainer.append(markedRadioParent)
        markedRadioParent.classList.toggle('animate-fade-in-fast')
    }

    //selectedItemTargetContainer.append(markedRadio.parentElement)
    //markedRadio.parentElement.classList.toggle('animate-fade-in-fast')
    searchContainer.classList.add('hidden')
}

export function putOldSelectedItemBackToList(selectedItemTargetContainer, itemsList) {
    if (selectedItemTargetContainer.children[0]) {
        selectedItemTargetContainer.children[0].classList.remove('animate-fade-in-fast')
        if (selectedItemTargetContainer.children[0].id !== 'initial-open-search-button') {
            itemsList.insertAdjacentElement('afterbegin', selectedItemTargetContainer.children[0])
        }
        selectedItemTargetContainer.innerHTML = ''
    }
}