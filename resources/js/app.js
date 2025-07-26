import * as mobileMenu from './modules/mobile-menu'
import * as toggle from './modules/toggle'
import * as amigoLeo from './modules/amigo-leo'
import * as modal from './modules/modal'
import * as toast from './modules/toast'
import * as ajaxPost from './modules/ajax-post.js'
import * as richEditor from './modules/rich-text-editor.js'
import * as themeSwitch from './modules/theme-switch.js'
import * as menuPanel from './modules/menu-panel.js'

import.meta.glob([
    '../img/**',
    '../fonts/**',
])

window.globalModules = {
    "mobileMenu": mobileMenu,
    "toggle"    : toggle,
    "richEditor": richEditor,
    "themeSwitch": themeSwitch,
    "menuPanel": menuPanel,
}

/*------------------------------------------------
    Triggers after document load
-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    initAllModules()

    if (document.keyboardShortcutEventAdded !== true) {
        let ignoreKeys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Alt', 'Shift', 'Meta']
        document.addEventListener('keydown', (event) => {
            if (ignoreKeys.indexOf(event.key) <= -1 && event.ctrlKey && event.key === 'b') {
                // some action / click / etc
            }

            if (ignoreKeys.indexOf(event.key) <= -1 && event.key === 'Escape') {
                // some action / click / etc
                // Example: Modal.close('main-modal')
            }
        }, {once: false})
        document.keyboardShortcutEventAdded = true
    }
})

/*------------------------------------------------
    Make the initAllModules method global
-------------------------------------------------*/
window.initAllModules = () => {
    Object.entries(globalModules).forEach(([moduleName, module]) => {
        module.init()
    })
}

/*------------------------------------------------
    Init only specific modules
-------------------------------------------------*/
window.initListOfModules = (listOfModulesToInit) => {
    listOfModulesToInit.forEach((module) => {
        globalModules[module].init()
    })
}
