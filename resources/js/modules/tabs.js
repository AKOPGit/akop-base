export function init() {
    let tabsTriggers = document.querySelectorAll('[data-js-tabs]')
    if (tabsTriggers[0]) {
        tabsTriggers.forEach((trigger) => {
            let data = trigger.dataset.jsTabs ? JSON.parse(trigger.dataset.jsTabs) : {}

            if (!data.targetId || !data.event || !data.targetContainerId) {
                return false
            }

            let options = {
                once: data.once || false,
            }

            if (trigger.tabsEventAdded !== true) {
                trigger.addEventListener(data.event, (event) => {
                    closeAllTabs(data.targetContainerId)
                    unmarkAllTriggers(data.targetContainerId,data)
                    markSelectedTrigger(trigger,data)
                    openTab(data.targetId)
                }, options)
                trigger.tabsEventAdded = true
            }

            if (data.selectedOnInit === true){
                trigger.click()
                /*setTimeout(() => {
                    //trigger.dataset.jsTabs = '{"targetId":"'+data.targetId+'","event":"'+data.event+'","targetContainerId":"'+data.targetContainerId+'"}'
                    trigger.dataset.jsTabs = JSON.stringify({"targetId":data.targetId,"event":data.event,"targetContainerId":data.targetContainerId,"activeClasses":data.activeClasses,"inactiveClasses":data.inactiveClasses})
                }, 2000)*/

            }
        })
    }
}

export function openTab(targetId) {
    let tabToOpen = document.getElementById(targetId) || false

    if (!tabToOpen) {
        return false
    }

    tabToOpen.classList.remove('hidden')
}

export function closeAllTabs(targetContainerId) {
    let tabsContainer = document.getElementById(targetContainerId)

    if (!tabsContainer) {
        return false
    }

    let children = tabsContainer.children
    let childrenLength = children.length
    for (let i = 0; i < childrenLength; i++) {
        let tab = children[i]
        tab.classList.add('hidden')
    }
}

export function markSelectedTrigger(trigger,data) {

    data.inactiveClasses.forEach(item => trigger.classList.remove(item));
    data.activeClasses.forEach(item => trigger.classList.add(item));

    if (trigger.tagName === 'SPAN' || trigger.tagName === 'DIV'){
        trigger.setAttribute('tabindex',-1)
    }

    trigger.parentNode.scrollLeft = trigger.offsetLeft
}

export function unmarkAllTriggers(targetContainerId, data) {
    let triggerData = data
    let tabsTriggers = document.querySelectorAll('[data-js-tabs]')
    if (tabsTriggers[0]) {
        tabsTriggers.forEach((trigger) => {
            let data = trigger.dataset.jsTabs ? JSON.parse(trigger.dataset.jsTabs) : {}
            if (data.targetContainerId === targetContainerId) {
                data.activeClasses.forEach(item => trigger.classList.remove(item));
                data.inactiveClasses.forEach(item => trigger.classList.add(item));
            }
        })
    }
}