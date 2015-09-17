using System.Collections.Generic;
using CookingWithJoe.Models;

namespace CookingWithJoe.Services
{
    public interface IRecipeService
    {
        void CreateRecipe(Recipe recipe);
        void DeleteRecipe(int id);
        void EditRecipe(Recipe recipe);
        Recipe FindRecipe(int id);
        IList<Recipe> ListRecipes();
    }
}