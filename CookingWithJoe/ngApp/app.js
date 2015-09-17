var CookingWithJoe;
(function (CookingWithJoe) {
    angular.module('CookingWithJoe', ['ngResource', 'ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: '/ngApp/list.html',
            controller: 'RecipeController as vm'
        }).when('/edit/:id', {
            templateUrl: '/ngApp/edit.html',
            controller: 'RecipeEditController as vm'
        }).when('/delete/:id', {
            templateUrl: '/ngApp/delete.html',
            controller: 'RecipeDeleteController as vm'
        }).when('/add', {
            templateUrl: '/ngApp/add.html',
            controller: 'RecipeAddController as vm'
        }).when('/login', {
            templateUrl: '/ngApp/login.html'
        });
        $locationProvider.html5Mode(true);
    });
    angular.module('CookingWithJoe').factory('authInterceptor', function ($q, $window, $location) {
        return ({
            request: function (config) {
                config.headers = config.headers || {};
                var token = $window.sessionStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                }
                return response || $q.when(response);
            }
        });
    });
    angular.module('CookingWithJoe').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
    ;
})(CookingWithJoe || (CookingWithJoe = {}));
//# sourceMappingURL=app.js.map