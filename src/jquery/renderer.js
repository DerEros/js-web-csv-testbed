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

    renderGrouped: function(groupModel, columnClickHandlers) {
        var self = this;
        this.resetOutput();

        var groups = groupModel.getGroups();
        $.each(groups, function(groupName, dataModel) {
            var header = $("<h2></h2>", { "class": "group-header" }).text(groupName);
            self.appendToOutput(header);

            self.renderList(groups[groupName], columnClickHandlers);
        });
    },

    renderList: function(dataModel, columnClickHandlers) {
        var fields = dataModel.getFieldNames();
        var objects = dataModel.getItems();

        var table = $("<table></table>", { "class": "output-table" });
        table.append(this.renderHeader(fields, columnClickHandlers, dataModel.getSortedColumnName()));
        table.append(this.renderBody(objects, fields));

        this.appendToOutput(table);
    },

    renderHeader: function(fieldNames, columnClickHandlers, sortedByColumn) {
        var headerContainer = $("<thead></thead>", { "class": "output-table-head" });
        $.each(fieldNames, function(idx, name){
            var attributes = {
                "class": "output-table-head-column",
                on: {
                    click: columnClickHandlers[name]
                }
            }

            if (name == sortedByColumn) {
                attributes.class += " output-table-head-column-sorted";
            }
        
            headerContainer.append($("<th></th>", attributes).text(name));
        });

        return headerContainer;
    },

    renderBody: function(rows, columns) {
        var self = this;
        var bodyContainer = $("<tbody></tbody>", { "class": "output-table-body" });
        $.each(rows, function(idx, row) {
            bodyContainer.append(self.renderRow(row, columns));
        });

        return bodyContainer;
    },

    renderRow: function(row, columns) {
        var rowContainer = $("<tr></tr>", { "class": "output-table-row" });
        $.each(columns, function(idx, columnName) {
            var columnValue = row[columnName];
            rowContainer.append($("<td></td>", { "class": "output-table-field" }).text(columnValue));
        });

        return rowContainer;
    },

    renderError: function(error) {
        getOutput().text("Loading data failed: " + error);
    }
};