(function () {
    'use strict';

    angular
        .module('app')
        .controller('editHomeController', ['$scope', 'zerionService', 'sharedList', '$state', function ($scope, zerionService, sharedList, $state) {

            $scope.editingHome = {};
            $scope.addIt = {};
            $scope.addIt.id = sharedList.getList().id;
            $scope.addIt.name = sharedList.getList().name;
            $scope.addIt.description = sharedList.getList().description;
            $scope.addIt.imgs = sharedList.getList().imgs;

            $scope.$on("fileProgress", function (e, progress) {
                $scope.progress = progress.loaded / progress.total;
            });

            $scope.saveForm = function (addIt) {
                console.log(addIt.id + '' + addIt.name + '' + addIt.description + '' + addIt.imgs);
                if (addIt.id === null) {
                    zerionService.creatNewData(addIt).then(function (response) {
                        console.log(response);
                        alert('New file added sucessfully!' + '' + response.data);
                        $scope.addIt.id = "";
                        $scope.addIt.name = "";
                        $scope.addIt.description = "";
                        $scope.addIt.imgs = "";
                    }, function (response) {
                        console.log(response);
                        alert('Error! while adding the new file' + '' + response.statusText);
                    });
                } else if (addIt.id) {
                    zerionService.editInitialData(addIt).then(function (response) {
                        console.log(response);
                        alert('Edited file added sucessfully!' + '' + response.data);
                        $scope.addIt.id = "";
                        $scope.addIt.name = "";
                        $scope.addIt.description = "";
                        $scope.addIt.imgs = "";
                    }, function (response) {
                        console.log(response);
                        alert('Error! while adding the edited file' + '' + response.statusText);
                    });
                }
            };

            $scope.cancel = function () {
                $state.go('home');
            };

        }]);
}());