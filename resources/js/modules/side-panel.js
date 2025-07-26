import * as searchParams from './search-params'
import * as ajaxModule from './ajax'

export function init() {

    let sidePanelTriggers = document.querySelectorAll('[data-js-side-panel]')
    if (sidePanelTriggers[0]) {
        sidePanelTriggers.forEach((sidePanelTrigger) => {
            let data    = sidePanelTrigger.dataset.jsSidePanel ? JSON.parse(sidePanelTrigger.dataset.jsSidePanel) : {}
            let options = {
                once: data.once || false,
            }

            if ((!data.target || !data.url) && data.action === 'open') {
                return false
            }

            if (sidePanelTrigger.sidePanelOpenOrCloseEventAdded !== true) {

                sidePanelTrigger.addEventListener(data.event || 'click', (event) => {

                    if (data.action === 'open') {
                        openSidePanel(data, event)
                    }

                    if (data.action === 'close') {
                        closeSidePanel(data, event)
                    }

                }, options)
                sidePanelTrigger.sidePanelOpenOrCloseEventAdded = true
            }
        })
    }

    /*let sidePanelCloseTrigger = document.querySelectorAll('.js-side-panel-close')
    if (sidePanelCloseTrigger[0]) {
        sidePanelCloseTrigger.forEach((closeTrigger) => {
            let event = closeTrigger.dataset.event || 'click'
            closeTrigger.addEventListener(event, closeSidePanel, true)
        })
    }*/

    /*let loadContentTriggers = document.querySelectorAll('.js-side-panel-load-content')
    if (loadContentTriggers[0]) {
        loadContentTriggers.forEach((loadContentTrigger) => {

            if (loadContentTrigger.sidePanelLoadContentEventAdded !== true) {

                let event  = loadContentTrigger.dataset.event || 'click'
                let target = document.getElementById(loadContentTrigger.dataset.target) || null
                let url    = loadContentTrigger.dataset.url || null

                if (url && target) {
                    loadContentTrigger.addEventListener(event, (event) => {
                        loadSidePanelContent(target, url)
                    }, false)
                    loadContentTrigger.sidePanelLoadContentEventAdded = true
                }
            }
        })
    }*/
}

export function loadSidePanelContent(target, url) {

    if (target && url) {

        //let sidePanelTitle   = document.getElementById(target.id + '-title') || null
        let sidePanelContent = document.getElementById(target.id) || null

        let ajaxObj = ajaxModule.init('GET', url)

        //let overlay = document.createElement('div')
        //overlay.classList.add('absolute', 'cursor-not-allowed', 'inset-0', 'w-full', 'h-full', 'm-0', 'p-0', 'bg-white', 'opacity-75', 'transition-all', 'duration-200', 'ease-in-out')

        if (sidePanelContent !== null) {
            sidePanelContent.classList.add('opacity-75')
        }

        //sidePanelContent.appendChild(overlay)

        /*if (sidePanelContent !== null) {
            sidePanelTitle.classList.add('animate-pulse')
            sidePanelTitle.innerText = 'Carregando...'
        }*/

        ajaxObj.onload = function () {
            let data = ajaxObj.response

            if (ajaxObj.status === 200) {
                //sidePanelTitle.innerText   = data.title
                sidePanelContent.innerHTML = data.content
                ajaxModule.includeScripts(sidePanelContent)
                initAllModules()
            } else if (ajaxObj.status === 403) {
                showWarning(data)
                closeAllSidePanels()
            } else {
                data.message = 'Esta ação não pôde ser completada'
                showWarning(data)
                closeAllSidePanels()
            }

            //sidePanelContent.scrollTop = 0
            sidePanelContent.classList.remove('opacity-75')
            //sidePanelTitle.classList.remove('animate-pulse')
        }

        ajaxObj.send()
    }
}

export function openSidePanel(data, e) {
    //let data      = (e.currentTarget) ? e.currentTarget.dataset : e.dataset
    let url             = data.url || null
    let sidePanel       = document.getElementById(data.target)
    let addSearchParams = data.addSearchParams || false

    if (sidePanel) {
        sidePanel.classList.remove('hidden')
        sidePanel.classList.add('z-30')
        sidePanel.dataset.opened = 'true'
        sidePanel.style.right    = '0'

        document.getElementsByTagName('body')[0].style.overflowY = 'hidden'

        if (url) {
            url = addSearchParams ? addSearchParamsToUrl(url) : url
            loadSidePanelContent(sidePanel, url)
        }

        if (shouldAddHistory(data)) addHistory(data)

        if (shouldShowOverlay(data)) showOverlay()

        setPanelWidth(data)
    }

    if (e)
        e.stopPropagation()
}

export function addSearchParamsToUrl(url) {
    let searchParams              = new URLSearchParams(location.search)
    let existentSearchParamsInUrl = new URLSearchParams(url.split('?')[1])

    url = url.split('?')[0]

    if (!existentSearchParamsInUrl.entries().next().done) {
        for (let [key, value] of existentSearchParamsInUrl.entries()) {
            searchParams.set(key, value)
        }
    }

    return url + '?' + searchParams.toString()
}

export function restorePreSidePanelSearchParams() {
    let currentSearchParams = new URLSearchParams(location.search)
    currentSearchParams.delete('action')
    currentSearchParams.delete('url')
    currentSearchParams.delete('target')
    currentSearchParams.delete('small')
    currentSearchParams.delete('overlay')

    if (currentSearchParams.toString().length > 1)
        currentSearchParams = '?' + currentSearchParams.toString()

    let newUrl = searchParams.getURLWithoutSearchParams() + currentSearchParams
    history.replaceState(null, null, newUrl)
}

export function addHistory(data) {
    let newUrl = getSidePanelURL(data)
    history.pushState(null, null, newUrl)
}

export function getSidePanelURL(data, onlyParams) {
    onlyParams       = onlyParams || false
    let params       = new URLSearchParams(location.search)
    let overlayValue = shouldShowOverlay(data) ? 'true' : 'false'
    let smallValue   = shouldBeSmall(data) ? 'true' : 'false'
    params.set('action', 'side-panel-open')
    params.set('url', data.url || null)
    params.set('target', data.target)
    params.set('small', smallValue)
    params.set('overlay', overlayValue)

    // Return only the params (not the URL)
    if (onlyParams) return params.toString()

    return searchParams.getURLWithoutSearchParams() + '?' + params.toString()
}

export function setPanelWidth(data) {
    let target = document.getElementById(data.target)
    target.classList.remove('md:w-4/5', 'md:w-3/5', 'lg:w-2/5', 'xl:w-2/6')

    if (data.small && (data.small === true || data.small === 'true'))
        return target.classList.add('md:w-3/5', 'lg:w-2/5', 'xl:w-2/6')

    target.classList.add('md:w-4/5')
}

export function shouldAddHistory(data) {
    return data.history === true || data.history === 'true'
}

export function shouldShowOverlay(data) {
    return data.overlay === true || data.overlay === 'true'
}

export function shouldBeSmall(data) {
    return data.small === true || data.small === 'true'
}

export function closeSidePanel(data, e) {

    let sidePanel = document.getElementById(data.sidePanel) || null

    if (!sidePanel) {
        return closeAllSidePanels()
    }

    sidePanel.dataset.opened = 'false'
    sidePanel.style.right    = '-200%' // I could also write style['right'] (good to use with variables)
    sidePanel.innerHTML = ''

    hideOverlay()
    restorePreSidePanelSearchParams()
}

export function closeAllSidePanels() {
    let sidePanel = document.getElementById('side-panel') || null
    if (sidePanel) {
        sidePanel.classList.remove('hidden')
        sidePanel.dataset.opened = 'false'
        sidePanel.style.right    = '-200%'
        sidePanel.innerHTML = ''
        hideOverlay()
        restorePreSidePanelSearchParams()
    }
}

export function showOverlay() {
    let overlay = document.querySelector('.overlay')
    if (overlay && overlay.classList.contains('hidden'))
        overlay.classList.remove('hidden')
}

export function hideOverlay() {
    let overlay = document.querySelector('.overlay')
    if (overlay && !overlay.classList.contains('hidden')) {
        if (!openedSidePanels()) {
            document.getElementsByTagName('body')[0].style.overflowY = 'auto'
            overlay.classList.add('hidden')
        }
    }
}

export function openedSidePanels() {
    let sidePanel = document.getElementById('side-panel') || null
    if (sidePanel) {
        if (sidePanel.dataset.opened === 'true') {
            return true
        }
    }
    return false
}

export function showWarning(data) {
    swal.fire('Atenção', data.message, 'warning')
}
