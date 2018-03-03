var $ = require("jquery");

import loader from "./csvloader.js";
import renderer from "./renderer.js";

function fetchData(url) {
    return loader.getData(url);
}

function renderWhenReady(dataPromise) {
    dataPromise.done(renderData).fail(renderError);
}

function renderData(result) {
    renderer.renderList(result);
}

function renderError(result) {
    renderer.renderError(result);
}

$(document).ready(function() {
    var dataPromise = fetchData("/data.csv");
    renderWhenReady(dataPromise);
});