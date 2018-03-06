var _ = require("lodash");

export default {
    create: function(fieldNames, items) {
        var SortDirection = Object.freeze({"ASCENDING": 1, "DESCENDING": 2});

        function toggleDirection(previousDirection) {
            if (previousDirection == SortDirection.ASCENDING) {
                return SortDirection.DESCENDING;
            } else {
                return SortDirection.ASCENDING;
            }
        }

        function sortItems(items, sortingModel) {
            if (sortingModel.direction == SortDirection.ASCENDING) {
                console.log("Sorting ascending");
                return _.sortBy(items, [sortingModel.fieldName]);
            } else {
                console.log("Sorting descending");
                return _.sortBy(items, [sortingModel.fieldName]).reverse();
            }
        }
        
        return {
            sortByField: {
                fieldName: fieldNames[0],
                direction: SortDirection.ASCENDING
            },

            setSortBy: function(fieldName) {
                if (fieldName == this.sortByField.fieldName) {
                    this.sortByField.direction = toggleDirection(this.sortByField.direction);
                } else {
                    this.sortByField = { 
                        fieldName: fieldName,
                        direction: SortDirection.ASCENDING
                    }
                }
            },

            getFieldNames: function() { return fieldNames },

            getItems: function() { 
                return sortItems(items, this.sortByField);
            },

            getSortedColumnName: function() { return this.sortByField.fieldName; },

            getSortedColumnDirection: function() { return this.sortByField.direction; }
        }
    },
}
