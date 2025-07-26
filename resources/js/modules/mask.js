import IMask from 'imask'

export function init() {

    let targets = document.querySelectorAll('[data-js-mask]')

    if (targets[0]) {
        targets.forEach((target) => {

            let maskType = target.dataset.jsMask
            IMask(target, getMaskOptions(maskType))

        })
    }

}

export function getMaskOptions(maskType) {

    let options = {}

    if (maskType === 'phone') {
        options.mask = '(00) 00000-0000'
    }

    if (maskType === 'cpf') {
        options.mask = '000.000.000-00'
    }

    if (maskType === 'cnpj') {
        options.mask = '00.000.000/0000-00'
    }

    if (maskType === 'number') {
        options.mask = /^\d+$/
    }

    if (maskType === 'zip') {
        options.mask = '00000-000'
    }

    if (maskType === 'decimalBR') {
        options.mask = [
            {mask: '0{,00}'},
            {mask: '00{,00}'},
            {mask: '000{,00}'},
            {mask: '0.000{,00}'},
            {mask: '00.000{,00}'},
            {mask: '000.000{,00}'},
            {mask: '0.000.000{,00}'},
            {mask: '00.000.000{,00}'},
            {mask: '000.000.000{,00}'},
            {mask: '0.000.000.000{,00}'},
            {mask: '00.000.000.000{,00}'},
            {mask: '000.000.000.000{,00}'},
        ]
    }

    if (maskType === 'decimalUS') {
        options.mask = [
            { mask: '0{.00}' },
            { mask: '00{.00}' },
            { mask: '000{.00}' },
            { mask: '0,000{.00}' },
            { mask: '00,000{.00}' },
            { mask: '000,000{.00}' },
            { mask: '0,000,000{.00}' },
            { mask: '00,000,000{.00}' },
            { mask: '000,000,000{.00}' },
            { mask: '0,000,000,000{.00}' },
            { mask: '00,000,000,000{.00}' },
            { mask: '000,000,000,000{.00}' }
        ]
    }

    if (maskType === 'percentualBR') {
        options.mask = [
            { mask: '0{,00}' },
            { mask: '00{,00}' },
            { mask: '100' },
        ]
    }

    if (maskType === 'percentualUS') {
        options.mask = [
            { mask: '0{.00}' },
            { mask: '00{.00}' },
            { mask: '101{.00}' },
        ]
    }

    return options
}