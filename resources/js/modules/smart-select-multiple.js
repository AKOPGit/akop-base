import {doSearchInContainer} from "./search-in-container"

export function init() {
    let smartSelectTriggers = document.querySelectorAll('[data-js-smart-select-multiple]')
    if (smartSelectTriggers[0]) {
        smartSelectTriggers.forEach((smartContainer) => {

            let data = smartContainer.dataset.jsSmartSelectMultiple ? JSON.parse(smartContainer.dataset.jsSmartSelectMultiple) : {}

            if (!data.searchContainerId || !data.event) {
                return false
            }

            let options = {
                once: data.once || false,
            }

            if (smartContainer.smartSelectEventAdded !== true) {

                let searchContainer = document.getElementById(data.searchContainerId)

                let closeSearchButton = searchContainer.querySelector('[data-js-smart-select-multiple-close-search]')
                if (closeSearchButton) {
                    if (closeSearchButton.closeEventAdded !== true) {
                        closeSearchButton.addEventListener('click', (event) => {
                            clearSearchContainer(searchContainer.id)
                            hideSearchContainer(searchContainer.id)
                        }, {once: false})
                        closeSearchButton.closeEventAdded = true
                    }
                }

                let clearButton = searchContainer.querySelector('[data-js-smart-select-multiple-clear]')
                if (clearButton) {
                    if (clearButton.closeEventAdded !== true) {
                        clearButton.addEventListener('click', (event) => {
                            clearSearchContainer(searchContainer.id)
                        }, {once: false})
                        clearButton.closeEventAdded = true
                    }
                }

                let showSearchContainerButton = smartContainer.querySelector('[id*=-show-search-button]')
                if (showSearchContainerButton) {
                    if (showSearchContainerButton.showSearchContainerEventAdded !== true) {
                        showSearchContainerButton.addEventListener('click', (event) => {
                            clearSearchContainer(searchContainer.id)
                            showSearchContainer(showSearchContainerButton, searchContainer.id)
                        }, {once: false})
                        showSearchContainerButton.showSearchContainerEventAdded = true
                    }
                }

                let checkButtons = searchContainer.querySelectorAll('[data-js-smart-select-multiple-check]')
                if (checkButtons[0]) {
                    checkButtons.forEach((checkButton) => {

                        if (checkButton.checked) {
                            moveSelectedItemToSelectedContainer(smartContainer, checkButton)
                        }

                        if (checkButton.selectItemEventAdded !== true) {
                            checkButton.addEventListener('change', (event) => {
                                moveSelectedItemToSelectedContainer(smartContainer, checkButton)
                            }, {once: false})
                            checkButton.selectItemEventAdded = true
                        }
                    })
                }

                let searchInput = searchContainer.querySelector('[data-js-smart-select-multiple-search-input]')
                if (searchInput) {
                    if (searchInput.searchEventAdded !== true) {
                        searchInput.addEventListener('keyup', (event) => {
                            doSearchInContainer(searchContainer.id, searchInput.value)
                        }, {once: false})
                        searchInput.searchEventAdded = true
                    }
                }

                /*smartContainer.addEventListener(data.event, (event) => {
                    openSearchContainer(smartContainer, searchContainer.id)
                }, options)*/
                smartContainer.smartSelectEventAdded = true
            }
        })
    }
}

export function showSearchContainer(button, searchContainerId) {
    let searchContainer           = document.getElementById(searchContainerId)
    let searchContainerAnimations = JSON.parse(searchContainer.dataset.animations)

    searchContainer.classList.add(searchContainerAnimations.show)

    if (!searchContainer.classList.contains(searchContainerAnimations.side))
        searchContainer.classList.add(searchContainerAnimations.side)

    if (searchContainer.classList.contains('hidden'))
        searchContainer.classList.remove('hidden')

    // Make invisible "Show search container button"
    button.classList.add('hidden')
}

export function hideSearchContainer(searchContainerId) {
    let searchContainer           = document.getElementById(searchContainerId)
    let searchContainerAnimations = JSON.parse(searchContainer.dataset.animations)

    searchContainer.classList.remove(searchContainerAnimations.show)
    searchContainer.classList.add(searchContainerAnimations.hide)

    if (!searchContainer.classList.contains('hidden')) {
        setTimeout(() => {
            searchContainer.classList.add('hidden')
            searchContainer.classList.remove(searchContainerAnimations.hide)
        }, 250)
    }


    // Make visible "Show search container button"
    let hideSearchContainerButton = searchContainer.parentNode.querySelector('[id*=-show-search-button]')
    hideSearchContainerButton.classList.remove('hidden')
}

export function clearSearchContainer(searchContainerId) {
    let searchContainer = document.getElementById(searchContainerId)
    let searchInput     = searchContainer.querySelector('[id$=-search-input]')

    searchInput.value = ''
    searchInput.dispatchEvent(new KeyboardEvent('keyup', {'key': 'space'}))
}

export function copyFromSelectedContainerToExtraContainer(smartContainer) {
    let selectedItemContainer      = smartContainer.querySelector('[data-selected-item-container]')
    let selectedItemExtraContainer = smartContainer.querySelector('[data-selected-item-extra-container]')

    selectedItemExtraContainer.innerHTML = selectedItemContainer.innerHTML

    for (let child = selectedItemExtraContainer.firstChild; child !== null; child = child.nextSibling) {
        let originalChildId = child.id
        child.id            = 'copy-' + originalChildId
        child.querySelector('svg').addEventListener('click', (event) => {
            document.getElementById(originalChildId).querySelector('svg').dispatchEvent(new Event('click'))
        }, {once: true})
    }
}

export function moveSelectedItemToSelectedContainer(smartContainer, markedRadio) {

    let markedRadioId               = markedRadio.id
    let markedRadioSelectedTemplate = document.getElementById(markedRadioId + '-selected')
    let selectedItemContainer       = smartContainer.querySelector('[data-selected-item-container]')
    markedRadioSelectedTemplate.classList.remove('hidden')
    let selectedItem = selectedItemContainer.insertAdjacentElement('afterbegin', markedRadioSelectedTemplate)

    let markedRadioParentId = markedRadio.dataset.checkParentId
    let markedRadioParent   = document.getElementById(markedRadioParentId) || false

    // Hide the item in the search list
    if (!markedRadioParent.classList.contains('animate-slide-out-right'))
        markedRadioParent.classList.add('animate-slide-out-right')

    setTimeout(() => {
        if (!markedRadioParent.classList.contains('hidden'))
            markedRadioParent.classList.add('hidden')
        copyFromSelectedContainerToExtraContainer(smartContainer)
    }, 100)

    // Add data-is-selected
    markedRadioParent.setAttribute('data-is-selected', true)

    selectedItem.querySelector('svg').addEventListener('click', (event) => {
        moveSelectedItemBack(smartContainer, markedRadioId, markedRadioParent, selectedItem)
    }, {once: true})

    // Check whether there are unselected items in the search list
    checkIfThereAreUnselectedItems(smartContainer)
}

export function checkIfThereAreUnselectedItems(smartContainer) {
    let unselectedItemsList = smartContainer.querySelector('[data-unselected-items-list]')
    let allSelected         = true
    for (let child = unselectedItemsList.firstChild; child !== null; child = child.nextSibling) {
        if (child.id && child.dataset.isSelected != "true") {
            allSelected = false
        }
    }

    if (allSelected === true) {
        clearSearchContainer(smartContainer.querySelector('[id*=-search-container]').id)
    }

}

export function moveSelectedItemBack(smartContainer, markedRadioId, markedRadioParent, selectedItem) {
    let markedRadio = document.getElementById(markedRadioId)

    markedRadio.checked = false

    markedRadioParent.insertAdjacentElement('afterbegin', selectedItem)

    if (markedRadioParent.classList.contains('animate-slide-out-right'))
        markedRadioParent.classList.remove('animate-slide-out-right')

    if (markedRadioParent.classList.contains('hidden'))
        markedRadioParent.classList.remove('hidden')

    // Remove data-is-selected
    markedRadioParent.removeAttribute('data-is-selected')

    if (!selectedItem.classList.contains('hidden'))
        selectedItem.classList.add('hidden')

    clearSearchContainer(smartContainer.querySelector('[id*=-search-container]').id)

    copyFromSelectedContainerToExtraContainer(smartContainer)

}