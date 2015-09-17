using CookingWithJoe.Models;
using CookingWithJoe.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CookingWithJoe.API
{
    public class RecipesController : ApiController
    {
        private IRecipeService _recipeService;

        public RecipesController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

    
        // GET: api/Recipes
        public IEnumerable<Recipe> Get()
        {
            return _recipeService.ListRecipes();
        }

        // GET: api/Recipes/5
        public Recipe Get(int id)
        {
            return _recipeService.FindRecipe(id);
        }
   
    // POST: api/Recipes
    public void Post([FromBody]string value)
        {
        }

        // PUT: api/Recipes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Recipes/5
        public void Delete(int id)
        {
        }
    }
}
