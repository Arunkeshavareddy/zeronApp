(function () {
    'use strict';

    angular
        .module('app')
        .service('zerionService', ['$http', function ($http) {
            
            this.getInitialData = function () {
                return $http({
                    method: 'GET',
                    url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records',
                    headers:
                    {
                        "Authorization": "Bearer 2cc676a66c23db2cbc049db3fe95d48888ca2d6e-a26fcdb6ea269ab8c19f12d97ef3ca20aa1b810e"
                    }

                });
            };
            this.creatNewData = function (addIt) {
                return $http({
                    method: 'POST',
                    url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records',
                    headers:
                    {
                        "Authorization": "Bearer 2cc676a66c23db2cbc049db3fe95d48888ca2d6e-a26fcdb6ea269ab8c19f12d97ef3ca20aa1b810e",
                        "content-type": "application/json"

                    },
                    body: { 
                        "name": addIt.name, 
                        "description": addIt.description, 
                        "imgs":[
                           {
                             "url": addIt.imgs
                           }
                        ]
                      }
                });
            };
            this.editInitialData = function (addIt) {
                return $http({
                    method: 'PUT',
                    url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records/'+addIt.id,
                    headers:
                    {
                        "Authorization": "Bearer 2cc676a66c23db2cbc049db3fe95d48888ca2d6e-a26fcdb6ea269ab8c19f12d97ef3ca20aa1b810e",
                        "content-type": "application/json"

                    },
                    body: { 
                        "name": addIt.name , 
                        "description": addIt.description, 
                        "imgs":[
                           {
                             "url": addIt.imgs
                           }
                        ]
                      }

                });
            };
            this.deletInitialData = function (resp) {
                return $http({
                    method: 'DELETE',
                    url: 'https://alpha-dataflownode.zerionsoftware.com/code_assignment/records/'+resp._id,
                    headers:
                    {
                        "Authorization": "Bearer 2cc676a66c23db2cbc049db3fe95d48888ca2d6e-a26fcdb6ea269ab8c19f12d97ef3ca20aa1b810e"
                    }

                });
            };
        }]);
}());
