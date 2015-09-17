namespace CookingWithJoe.Services {

    export class RecipeService {
        private RecipeResource

        public listRecipes() {
            return this.RecipeResource.query();
        }

        public getRecipe(id) {
            return this.RecipeResource.get({ id: id });
        }

        public saveRecipe(recipe) {
            return this.RecipeResource.save(recipe).$promise;
        }

        public deleteRecipe(id) {
            return this.RecipeResource.delete({ id: id }).$promise;
        }

        constructor($resource: ng.resource.IResourceService) {
            this.RecipeResource = $resource('/api/recipes/:id'); 
        }

    }

    angular.module('CookingWithJoe').service('recipeService', RecipeService);

} 