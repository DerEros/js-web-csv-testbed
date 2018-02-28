var $ = require("jquery");

function app() {
    $.get("/data.csv")
        .done(handleDataReceived)
        .fail(handleDataFailed);
}

function handleDataReceived(data) {
    alert("Got data! Data: " + data);
}

function handleDataFailed(status) {
    alert("Getting data failed! " + status);
}

$(document).ready(function() {
    app();
});