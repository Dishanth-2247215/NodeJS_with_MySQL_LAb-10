//IIFE
//()();

(function () {
    angular.module('myApp', ["ngRoute"])


        .controller('viewCtrl', function ($scope, $http) {
            $http.get('http://localhost:3000').then((response) => {
                $scope.datas = response.data
            })
        })

        .controller('createCtrl', function ($scope) {
            $scope.createEntry = function () {
                var jsonObj = '{"id":'+$scope.id +'","name":"' + $scope.name +'","email":"' + $scope.email +'","number":' + $scope.number + '}'
                console.log(jsonObj)

                fetch('http://localhost:3000/create', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.id=""
                $scope.name=""
                $scope.email=""
                $scope.number=""
            }
        })

        .controller('deleteCtrl', function ($scope, $http) {
            $http.get('http://localhost:3000/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                var delJson = { id: $scope.del.id }
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3000/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })



        .config(function ($routeProvider) {
            $routeProvider
            .when('/home', {
                templateUrl: 'home.html'
            })
                .when('/view', {
                    templateUrl: 'view.html',
                    controller: 'viewCtrl'
                })
                .when('/create', {
                    templateUrl: 'create.html',
                    controller: 'createCtrl'
                })
                .when('/update', {
                    templateUrl: 'update.html',
                    controller: 'updateCtrl'
                })
                .when('/delete', {
                    templateUrl: 'delete.html',
                    controller: 'deleteCtrl'
                })
                .otherwise({
                    redirectTo: '/index.html'
                })
        })
        .config(function ($locationProvider) {
            $locationProvider.hashPrefix('')
        })

})();