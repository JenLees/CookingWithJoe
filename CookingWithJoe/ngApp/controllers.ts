namespace CookingWithJoe.Controllers {


    class HomeController {

    }

    class RecipesController {
        public recipes

        constructor(recipeService: CookingWithJoe.Services.RecipeService) {
            this.recipes = recipeService.listRecipes();
        }
    }
    angular.module('CookingWithJoe').controller('RecipesController', RecipesController);

}

    class RecipeEditController {
        public recipeToEdit

        public save() {
            this.recipeService.saveRecipe(this.recipeToEdit).then(
                () => {
                    this.$location.path('/');
                }
                );
        }

        constructor
            (
            private recipeService: CookingWithJoe.Services.RecipeService,
            $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
            ) {
            let id = $routeParams['id'];
            this.recipeToEdit = recipeService.getRecipe(id);
        }
    }
    angular.module('CookingWithJoe').controller('RecipeEditController', RecipeEditController);


    class RecipeDeleteController {
        public recipeToDelete

        public delete() {
            this.recipeService.deleteRecipe(this.recipeToDelete.id).then(
                () => {
                    this.$location.path('/');
                }
                );
        }

        constructor
            (
            private recipeService: CookingWithJoe.Services.RecipeService,
            $routeParams: ng.route.IRouteParamsService,
            private $location: ng.ILocationService
            ) {
            let id = $routeParams['id'];
            this.recipeToDelete = recipeService.getRecipe(id);
        }
    }
    angular.module('CookingWithJoe').controller('RecipeDeleteController', RecipeDeleteController);


    const authenticateURL = '/Token';

    class AccountController {
        username: string
        password: string
        loginMessage: string
        newuser

        register() {
            this.$http.post("/api/Account/Register", this.newuser).success(() => {
                this.$location.path('/');
            });
        }

        login() {
            debugger
            let data = "grant_type=password&username=" + this.username + "&password=" + this.password;
            this.$http.post(authenticateURL, data,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success((result: any) => {
                    this.$window.sessionStorage.setItem('token', result.access_token);
                    this.$location.path('/');
                }).error(() => {
                    this.loginMessage = 'Invalid user name/password';
                });
        }

        logout() {
            this.$window.sessionStorage.removeItem('token');
        }

        isLoggedIn() {
            return this.$window.sessionStorage.getItem('token');
        }

        constructor(private $http: ng.IHttpService, private $window: ng.IWindowService, private $location: ng.ILocationService) { }
    }

   
    angular.module('CookingWithJoe').controller('AccountController', AccountController);

  
    class RecipeListController{
        public showModal(recipeToAdd: string) {
            this.$modal.open({
                templateUrl: '/ngApp/addrecipe.html',
                controller: DialogController,
                controllerAs: 'modal',
                resolve: {

                    recipeToAdd: () => recipeToAdd
                },
                size: 'lg'
            });

        }
        constructor(private $modal: angular.ui.bootstrap.IModalService) { }
    }
    angular.module('CookingWithJoe').controller('RecipeListController', RecipeListController);

    class DialogController {
       
        public save() {

            this.recipeService.saveRecipe(this.recipeToAdd).then(
                () => {
                    this.$location.path('/');
                }
            );
        }
        public ok() {
            this.$modalInstance.close();
        }
        constructor(public recipeToAdd: string, private $modalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private recipeService: CookingWithJoe.Services.RecipeService, private $location: ng.ILocationService) { }
    }

        
    class CategoriesController {
        public function($scope) {
            var app = angular.module("CookingWithJoe", ["checklist-model"]);
                $scope.categories = [
                    'breakfast',
                    'lunch',
                    'dinner',
                    'snacks/apps',
                    'dessert',
                    'holiday'
                ];
                $scope.recipe = {
                    categories: ['recipe']
                };
                $scope.checkAll = function () {
                    $scope.recipe.categories = angular.copy($scope.categories);
                };
                $scope.uncheckAll = function () {
                    $scope.recipe.categories = [];
                };
                $scope.checkFirst = function () {
                    $scope.recipe.categories.splice(0, $scope.recipe.categories.length);
                    $scope.recipe.categories.push('breakfast');
                };
                $scope.getCategories = function () {
                    return $scope.recipe.categories;
                };
                $scope.check = function (value, checked) {
                    var idx = $scope.recipe.categories.indexOf(value);
                    if (idx >= 0 && !checked) {
                        $scope.recipe.categories.splice(idx, 1);
                    };
                    if (idx < 0 && checked) {
                        $scope.recipe.categories.push(value);

                        angular.module('CookingWithJoe').controller('CategoriesController', CategoriesController);


                    }
                }
            };
        }
    
