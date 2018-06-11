(function () {
    'use strict';

    angular
        .module('app')
        .factory('sharedList', function () {
            var list = {
                id: null,
                name: null,
                description: null,
                imgs: null
            };

            return {
                addItem: addItem,
                getList: getList
            };

            function addItem(item) {
                list.id = item.id;
                list.name = item.name;
                list.description = item.description;
                list.imgs = item.imgs;
            }

            function getList() {
                return list;
            }
        });
}());
