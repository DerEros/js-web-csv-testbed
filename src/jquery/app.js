var $ = require("jquery");

import loader from "./csvloader.js";
import renderer from "./renderer.js";

var data = null;
var columnClickHandlers = null;

function fetchData(url) {
    return loader.getData(url);
}

function renderWhenReady(dataPromise) {
    dataPromise.done(handleData).fail(renderError);
}

function handleData(result) {
    data = result;
    columnClickHandlers = _.reduce(result.fields, addToHandlers, {});
    renderer.renderList(result, columnClickHandlers);
}

function addToHandlers(handlers, fieldName) {
    handlers[fieldName] = createClickHandler(fieldName);
    return handlers;
}

function createClickHandler(fieldName) {
    return function() {
        console.log("Sorting by", fieldName);
        sortDataBy(data, fieldName);
    }
}

function sortDataBy(data, fieldName) {
    var sortedData = _.sortBy(data.data, [fieldName]);
    data.data = sortedData;

    renderer.renderList(data, columnClickHandlers);
}

function renderError(result) {
    renderer.renderError(result);
}

$(document).ready(function() {
    var dataPromise = fetchData("/data.csv");
    renderWhenReady(dataPromise);
});