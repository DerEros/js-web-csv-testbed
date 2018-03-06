var _ = require("lodash");

export default {
    create: function(fieldNames, items) {
        return {
            sortByField: fieldNames[0],

            setSortBy: function(fieldName) {
                this.sortByField = fieldName;
            },

            getFieldNames: function() { return fieldNames },

            getItems: function() { 
                return _.sortBy(items, [this.sortByField]);
            }
        }
    },
}
