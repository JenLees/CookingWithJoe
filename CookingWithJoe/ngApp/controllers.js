var CookingWithJoe;
(function (CookingWithJoe) {
    var Controllers;
    (function (Controllers) {
        var RecipesController = (function () {
            function RecipesController(recipeService) {
                this.recipes = recipeService.listRecipes();
            }
            return RecipesController;
        })();
        angular.module('CookingWithJoe').controller('RecipesController', RecipesController);
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
        var RecipeAddController = (function () {
            function RecipeAddController(recipeService, $location) {
                this.recipeService = recipeService;
                this.$location = $location;
            }
            RecipeAddController.prototype.save = function () {
                var _this = this;
                this.recipeService.saveRecipe(this.recipeToAdd).then(function () {
                    _this.$location.path('/');
                });
            };
            return RecipeAddController;
        })();
        angular.module('CookingWithJoe').controller('RecipeAddController', RecipeAddController);
        var AccountController = (function () {
            function AccountController($http, $window, $location) {
                this.$http = $http;
                this.$window = $window;
                this.$location = $location;
            }
            AccountController.prototype.login = function () {
                var _this = this;
                var data = "grant_type=password&username=" + this.username + "&password=" + this.password;
                this.$http.post('http://website/Token', data, {
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
    })(Controllers = CookingWithJoe.Controllers || (CookingWithJoe.Controllers = {}));
})(CookingWithJoe || (CookingWithJoe = {}));
