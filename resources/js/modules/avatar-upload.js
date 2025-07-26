//import {showSuccessAlert, showValidationAlert} from "./ajax-post"
import * as ajaxModule from './ajax'

export function init() {
    let selectFileTriggers = document.querySelectorAll('[data-js-avatar-upload]')
    if (selectFileTriggers[0]) {
        selectFileTriggers.forEach((trigger) => {

            let data = trigger.dataset.jsAvatarUpload ? JSON.parse(trigger.dataset.jsAvatarUpload) : {}

            let options = {
                once: data.once || false,
            }

            if (!data.inputId) {
                return false
            }

            if (trigger.fileInputEventAdded !== true) {

                trigger.addEventListener(data.event || 'click', (event) => {

                    if (data.action === 'addAvatar') {
                        fireFileInput(data.inputId, event)
                    }

                    if (data.action === 'removeAvatar') {
                        if (confirm(data.confirm)){
                            removeFile(data.targetImgBgId, data.defaultAvatarImgUrl, data.removeAvatarInputId, event)
                        }
                    }

                }, options)

                let fileInput = document.getElementById(data.inputId)
                fileInput.addEventListener('change', (event) => {

                    loadImageFromFile(data.inputId, data.targetImgBgId, data.removeButtonId)

                    if (data.autoUpload) {
                        uploadAddedImage(data.inputId, data.action, data.model,
                            data.modelId, data.mediaCollection, data.loadingIconId,
                            data.loadingBgId, data.targetImgTagId, data.targetImgBgId)
                    }

                }, false)

                trigger.fileInputEventAdded = true
            }
        })
    }
}

export function removeFile(targetImgBgId, defaultAvatarImgUrl, removeAvatarInputId, e) {
    let removeAvatarInput = document.getElementById(removeAvatarInputId)
    let targetImgBg = document.getElementById(targetImgBgId)

    removeAvatarInput.value = 'remove'
    targetImgBg.style.backgroundImage    = "url('" + defaultAvatarImgUrl + "')"

    e.currentTarget.classList.add('hidden')

    e.stopPropagation()
}

export function fireFileInput(inputId, e) {
    let fileInput = document.getElementById(inputId)
    if (!fileInput || (fileInput && fileInput.type !== 'file')) {
        return false
    }

    fileInput.click()
    e.stopPropagation()
}

export function loadImageFromFile(inputId, targetImgBgId, removeButtonId) {
    let fileInput = document.getElementById(inputId)
    let removeButton = document.getElementById(removeButtonId)

    if (fileInput.files && fileInput.files[0]) {
        let reader    = new FileReader()
        reader.onload = (e) => {
            let targetImgBg = document.getElementById(targetImgBgId)

            targetImgBg.style.backgroundImage    = "url('" + e.target.result + "')"
            targetImgBg.style.backgroundSize     = 'cover'
            targetImgBg.style.backgroundPosition = 'center'
        }

        reader.readAsDataURL(fileInput.files[0])
        if (removeButton){
            removeButton.classList.remove('hidden')
        }
    }
}

export function uploadAddedImage(inputId, action, model, modelId, mediaCollection, loadingIconId, loadingBgId, targetImgTagId, targetImgBgId) {
    let fileInput = document.getElementById(inputId)
    let formData  = new FormData()
    formData.append('file', fileInput.files[0])
    formData.append('model', model)
    formData.append('model_id', modelId)
    formData.append('media_collection', mediaCollection)

    if (action) {
        let ajaxObj = ajaxModule.init('POST', action)
        showLoadingIcon(loadingIconId, loadingBgId)
        //removeUploadButtons(fileInput)
        alert('Should remove upload buttons on autoupload. Review the removeUploadButtons function')
        ajaxObj.onload = function () {
            let ajaxResponseData = ajaxObj.response

            if (ajaxObj.status === 200) {
                showSuccessAlert(ajaxResponseData)
                createHiddenInputWithMediaId(targetImgTagId, targetImgBgId, ajaxResponseData.media_id)
            } else if (ajaxObj.status === 422) {
                showValidationAlert(ajaxResponseData)
            } else {
                swal.fire('Alert', 'Other error', 'warning')
            }

            hideLoadingIcon(loadingIconId, loadingBgId)
        }

        ajaxObj.send(formData)
    }
}

export function showLoadingIcon(loadingIconId, loadingBgId) {
    let loadingIcon = document.getElementById(loadingIconId) || null
    let loadingBg   = document.getElementById(loadingBgId) || null

    if (loadingBg && loadingIcon) {
        loadingBg.classList.remove('hidden')
        loadingIcon.classList.remove('hidden')
    }

    return false
}

export function hideLoadingIcon(loadingIconId, loadingBgId) {
    let loadingIcon = document.getElementById(loadingIconId) || null
    let loadingBg   = document.getElementById(loadingBgId) || null

    if (loadingBg && loadingIcon) {
        loadingBg.classList.add('hidden')
        loadingIcon.classList.add('hidden')
    }

    return false
}

export function removeUploadButtons(fileInput) {
    //fileInput.triggerElement.remove()
}

export function createHiddenInputWithMediaId(targetImgTagId, targetImgBgId, mediaId) {
    let targetImg   = document.getElementById(targetImgTagId)
    let targetImgBg = document.getElementById(targetImgBgId)

    if (targetImg) {
        targetImg.dataset.mediaId = mediaId
    } else if (targetImgBg) {
        targetImgBg.dataset.mediaId = mediaId
    }

    return true
}
