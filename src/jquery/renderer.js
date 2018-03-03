var _ = require("lodash");
var $ = require("jquery");

function getOutput() {
    return $("#data-output");
};

export default {
    writeText: function(output) {
        getOutput().text(output);
    },

    appendToOutput: function(elements) {
        getOutput().append(elements);
    },

    resetOutput: function() {
        getOutput().html("");
    },

    renderGrouped: function(data, byField) {
        $("#data-output").text("Hello World!");
    },

    renderList: function(data) {
        this.resetOutput();

        var fields = data.fields;
        var objects = data.data;

        var table = $("<table></table>");
        table.append(this.renderHeader(fields));
        table.append(this.renderBody(objects, fields));

        this.appendToOutput(table);
    },

    renderHeader: function(fieldNames) {
        var headerContainer = $("<thead></thead>");
        $.each(fieldNames, function(idx, name){
            headerContainer.append($("<th>" + name + "</th>"));
        });

        return headerContainer;
    },

    renderBody: function(rows, columns) {
        var self = this;
        var bodyContainer = $("<tbody></tbody>");
        $.each(rows, function(idx, row) {
            bodyContainer.append(self.renderRow(row, columns));
        });

        return bodyContainer;
    },

    renderRow: function(row, columns) {
        var rowContainer = $("<tr></tr>");
        $.each(columns, function(idx, columnName) {
            var columnValue = row[columnName];
            rowContainer.append("<td>" + columnValue + "</td>");
        });

        return rowContainer;
    },

    renderError: function(error) {
        getOutput().text("Loading data failed: " + error);
    }
};