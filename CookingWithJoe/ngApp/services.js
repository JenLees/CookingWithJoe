var CookingWithJoe;
(function (CookingWithJoe) {
    var Services;
    (function (Services) {
        var RecipeService = (function () {
            function RecipeService($resource) {
                this.RecipeResource = $resource('/api/recipes/:id');
            }
            RecipeService.prototype.listRecipes = function () {
                return this.RecipeResource.query();
            };
            RecipeService.prototype.getRecipe = function (id) {
                return this.RecipeResource.get({ id: id });
            };
            RecipeService.prototype.saveRecipe = function (recipe) {
                debugger;
                return this.RecipeResource.save(recipe).$promise;
            };
            RecipeService.prototype.deleteRecipe = function (id) {
                return this.RecipeResource.delete({ id: id }).$promise;
            };
            return RecipeService;
        })();
        Services.RecipeService = RecipeService;
        angular.module('CookingWithJoe').service('recipeService', RecipeService);
    })(Services = CookingWithJoe.Services || (CookingWithJoe.Services = {}));
})(CookingWithJoe || (CookingWithJoe = {}));
//# sourceMappingURL=services.js.map