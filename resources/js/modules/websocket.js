import * as ajaxSlot from "./ajax-slot"

export function init() {
    let wsURL = process.env.NODE_ENV === 'development' ? 'wss://'+window.location.host+'/ws/:1333' : 'wss://'+window.location.host+'/redirect-to-ws/:1333';
    //let wsURL = process.env.NODE_ENV === 'development' ? 'ws://'+window.location.host+':1333' : 'wss://procomercial.com.br/ws/:1333';
    window.WebSocket  = window.WebSocket || window.MozWebSocket

    window.connection = new WebSocket(wsURL)

    window.connection.onmessage = function (message) {
        console.log('message received')
        let data = JSON.parse(message.data)
        ajaxSlot.updateSlotsViaWebSocket(data)
    }

    console.log('WS initiated 👇🏻')
    console.dir(window.connection)
    console.log('ENV: ' + process.env.NODE_ENV)

    /*let connectingSpan = document.getElementById("connecting");
    connection.onopen = function () {
        connectingSpan.innerText = "Connected";
    };
    connection.onerror = function (error) {
        connectingSpan.innerHTML = "Error occured";
    };*/
}
