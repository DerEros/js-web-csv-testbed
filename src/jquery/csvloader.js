import "./sass/style.sass";

var $ = require("jquery");
var _ = require("lodash");
var papa = require("papaparse");

export default {
    getData: function (url) {
        return $.get(url)
            .fail(this.handleDataFailed)
            .then(this.handleDataReceived)
    },

    handleDataReceived: function (data) {
        var result = papa.parse(data, {
            header: true
        });
        var parsedData = result.data;
        var fields = result.meta.fields;

        return {
            fields: fields,
            data: parsedData
        }
    },

    handleDataFailed: function (status) {
        return {
            error: "Getting data failed with code " + status.status + " (" + status.statusText + ")"
        };
    },
}