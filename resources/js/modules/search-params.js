import * as sidePanel from './side-panel';

export function init() {
    window.onpopstate = () => {
        this.checkSearchParams();
    };

    window.onload = () => {
        this.checkSearchParams();
    };
}

export function checkSearchParams() {
    let searchParams = new URLSearchParams(location.search);
    let data         = {dataset: Object.fromEntries(searchParams)};

    // We can't add history on a popstate or onload events
    // as it will cause an infinite loop
    data.dataset.history = false;

    if (data.dataset.action === 'side-panel-open')
        return sidePanel.openSidePanel(data.dataset);

    sidePanel.closeAllSidePanels();
}

export function clearSearchParams() {
    location.search = '';
}

export function getURLWithoutSearchParams() {
    //window.location.search.replace('?','')
    return window.location.href.replace(window.location.search, '');
}
