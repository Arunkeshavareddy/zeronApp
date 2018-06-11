(function () {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'homeController'
        })
        .state('editHome', {
          url: '/editHome',
          templateUrl: 'app/editHome/editHome.html',
          controller: 'editHomeController'
        });
    }]);
}());
