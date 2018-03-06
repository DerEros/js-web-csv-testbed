var $ = require("jquery");

import loader from "./csvloader.js";
import renderer from "./renderer.js";
import datamodel from "./datamodel.js";

var data = null;
var columnClickHandlers = null;
var dm = null;

function fetchData(url) {
    return loader.getData(url);
}

function renderWhenReady(dataPromise) {
    dataPromise.done(handleData).fail(renderError);
}

function handleData(result) {
    dm = datamodel.create(result.fields, result.data);
    columnClickHandlers = _.reduce(result.fields, addToHandlers, {});
    renderer.renderList(dm, columnClickHandlers);
}

function addToHandlers(handlers, fieldName) {
    handlers[fieldName] = createClickHandler(fieldName);
    return handlers;
}

function createClickHandler(fieldName) {
    return function() {
        dm.setSortBy(fieldName);
        renderer.renderList(dm, columnClickHandlers);
    }
}

function renderError(result) {
    renderer.renderError(result);
}

$(document).ready(function() {
    var dataPromise = fetchData("/data.csv");
    renderWhenReady(dataPromise);
});