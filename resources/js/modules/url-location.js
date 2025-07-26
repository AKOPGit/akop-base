export function init() {
    let urlChangeTriggers = document.querySelectorAll('.js-url-change')
    if (urlChangeTriggers[0]) {
        urlChangeTriggers.forEach((urlChangeTrigger) => {
            console.log(urlChangeTrigger.dataset.url)
            urlChangeTrigger.url   = urlChangeTrigger.dataset.url
            urlChangeTrigger.event = urlChangeTrigger.dataset.event || 'click'
            urlChangeTrigger.addEventListener(urlChangeTrigger.event, urlChange, false)
        })
    }
}

export function urlChange(e) {
    if (e.currentTarget.url){
        window.location.replace(e.currentTarget.url)
        return e.stopPropagation()
    }
}
