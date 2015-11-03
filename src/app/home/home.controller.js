
(function () {
  'use strict';

  angular
    .module('app')
    .controller('homeController', CatalogController);

  CatalogController.$inject = [];

  function CatalogController() {
    var vm = this;

    vm.init = function () {
      vm.message = 'Hello World';
    };

    vm.init();
  }
}());
