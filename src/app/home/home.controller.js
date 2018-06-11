
(function () {
  'use strict';

  angular
    .module('app')
    .controller('homeController', ['$scope', 'zerionService', 'sharedList', '$state', function ($scope, zerionService, sharedList, $state) {

      $scope.gridFormate = true;
      $scope.tableFormate = false;


      $scope.gridForm = function () {
        $scope.gridFormate = true;
        $scope.tableFormate = false;
      };

      $scope.tableForm = function () {
        $scope.gridFormate = false;
        $scope.tableFormate = true;
      };

      function getInitialData() {
        zerionService.getInitialData().then(function (response) {
          console.log(response);
          $scope.respData = response.data;
        }, function (response) {
          console.log(response);
          $scope.respData = response.statusText;
        });
      }

      function init() {
        getInitialData();
      }

      init();

      $scope.addForm = function () {
        console.log("adding data");
        sharedList.addItem({ id: null, name: null, description: null, imgs: null });
        console.log("sending some value to service" + sharedList.getList().id);
        $state.go('editHome');
      };

      $scope.resp = {};
      $scope.upsetForm = function (resp) {

        console.log("got some value" + resp.name + "Dec:" + resp.description + "IMG:" + resp.imgs[0].url);
        sharedList.addItem({ id: resp._id, name: resp.name, description: resp.description, imgs: resp.imgs[0].url });
        console.log("sending some value to service" + sharedList.getList().id);
        $state.go('editHome');

      };

      $scope.deletForm = function (resp) {

        zerionService.deletInitialData(resp).then(function (response) {
          console.log(response);
          $state.reload('home');
          alert('Deleted sucessfully!' + '' + response.data);
        }, function (response) {
          console.log(response);
          alert('Error! while deleting the file' + '' + response.data);
        });

      };

    }]);
}());
