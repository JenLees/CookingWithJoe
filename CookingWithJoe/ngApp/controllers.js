var CookingWithJoe;
(function (CookingWithJoe) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController() {
            }
            return HomeController;
        })();
        var RecipesController = (function () {
            function RecipesController(recipeService) {
                this.recipes = recipeService.listRecipes();
            }
            return RecipesController;
        })();
        angular.module('CookingWithJoe').controller('RecipesController', RecipesController);
    })(Controllers = CookingWithJoe.Controllers || (CookingWithJoe.Controllers = {}));
})(CookingWithJoe || (CookingWithJoe = {}));
var RecipeEditController = (function () {
    function RecipeEditController(recipeService, $routeParams, $location) {
        this.recipeService = recipeService;
        this.$location = $location;
        var id = $routeParams['id'];
        this.recipeToEdit = recipeService.getRecipe(id);
    }
    RecipeEditController.prototype.save = function () {
        var _this = this;
        this.recipeService.saveRecipe(this.recipeToEdit).then(function () {
            _this.$location.path('/');
        });
    };
    return RecipeEditController;
})();
angular.module('CookingWithJoe').controller('RecipeEditController', RecipeEditController);
var RecipeDeleteController = (function () {
    function RecipeDeleteController(recipeService, $routeParams, $location) {
        this.recipeService = recipeService;
        this.$location = $location;
        var id = $routeParams['id'];
        this.recipeToDelete = recipeService.getRecipe(id);
    }
    RecipeDeleteController.prototype.delete = function () {
        var _this = this;
        this.recipeService.deleteRecipe(this.recipeToDelete.id).then(function () {
            _this.$location.path('/');
        });
    };
    return RecipeDeleteController;
})();
angular.module('CookingWithJoe').controller('RecipeDeleteController', RecipeDeleteController);
var authenticateURL = '/Token';
var AccountController = (function () {
    function AccountController($http, $window, $location) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
    }
    AccountController.prototype.register = function () {
        var _this = this;
        this.$http.post("/api/Account/Register", this.newuser).success(function () {
            _this.$location.path('/');
        });
    };
    AccountController.prototype.login = function () {
        var _this = this;
        debugger;
        var data = "grant_type=password&username=" + this.username + "&password=" + this.password;
        this.$http.post(authenticateURL, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (result) {
            _this.$window.sessionStorage.setItem('token', result.access_token);
            _this.$location.path('/');
        }).error(function () {
            _this.loginMessage = 'Invalid user name/password';
        });
    };
    AccountController.prototype.logout = function () {
        this.$window.sessionStorage.removeItem('token');
    };
    AccountController.prototype.isLoggedIn = function () {
        return this.$window.sessionStorage.getItem('token');
    };
    return AccountController;
})();
angular.module('CookingWithJoe').controller('AccountController', AccountController);
var RecipeListController = (function () {
    function RecipeListController($modal) {
        this.$modal = $modal;
    }
    RecipeListController.prototype.showModal = function (recipeToAdd) {
        this.$modal.open({
            templateUrl: '/ngApp/addrecipe.html',
            controller: DialogController,
            controllerAs: 'modal',
            resolve: {
                recipeToAdd: function () { return recipeToAdd; }
            },
            size: 'lg'
        });
    };
    return RecipeListController;
})();
angular.module('CookingWithJoe').controller('RecipeListController', RecipeListController);
var DialogController = (function () {
    function DialogController(recipeToAdd, $modalInstance, recipeService, $location) {
        this.recipeToAdd = recipeToAdd;
        this.$modalInstance = $modalInstance;
        this.recipeService = recipeService;
        this.$location = $location;
    }
    DialogController.prototype.save = function () {
        var _this = this;
        this.recipeService.saveRecipe(this.recipeToAdd).then(function () {
            _this.$location.path('/');
        });
    };
    DialogController.prototype.ok = function () {
        this.$modalInstance.close();
    };
    return DialogController;
})();
//# sourceMappingURL=controllers.js.map