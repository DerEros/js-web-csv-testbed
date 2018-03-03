import "./sass/style.sass";

var $ = require("jquery");
var _ = require("lodash");
var papa = require("papaparse");

function app() {
    $.get("/data.csv")
        .done(handleDataReceived)
        .fail(handleDataFailed);
}

function handleDataReceived(data) {
    var result = papa.parse(data, {
        header: true
    });
    var parsedData = result.data;
    var fields = result.meta.fields;

    renderData(fields, parsedData);
}

function handleDataFailed(status) {
    alert("Getting data failed with code " + status.status + " (" + status.statusText + ")");
}

function renderData(fields, data) {
    $.each(data, function(idx, row) {
        $("#foo").append(idx + 1 + ". " + row.name + " (" + row.size + ")" + "<br>");
    });
}

$(document).ready(function() {
    app();
});