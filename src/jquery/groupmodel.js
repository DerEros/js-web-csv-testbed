var _ = require("lodash");

import datamodel from "./datamodel.js";

export default {
    create: function(fieldNames, items) {
        function itemsToDataModel(fieldNames, items) {
            return datamodel.create(fieldNames, items);
        }

        return {
            groupBy: "",

            setGroupBy: function(fieldName) {
                this.groupBy = fieldName;
            },

            getGroups: function() {
                var grouped = this.groupBy.trim() == "" ? _.chain({ "All": items }) : _.chain(items).groupBy(this.groupBy);

                return grouped
                    .mapValues(_.partial(itemsToDataModel, fieldNames))
                    .value();
            }
        }
    }
}