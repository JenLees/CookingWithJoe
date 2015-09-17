namespace CookingWithJoe.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<CookingWithJoe.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CookingWithJoe.Models.ApplicationDbContext context)
        {
            var recipes = new Recipe[] {
                 new Recipe{
                   RecipeName="Healthy Veggie Burritos",
                   Ingredients="Soy Chorizo, whole wheat tortillas, onions, zucchini, carrots, cheddar cheese, black beans, plain Greek yogurt, avocado",
                   Directions="Fry veggies, add chorizo, wrap in a tortilla and top with avocado, salsa, and yogurt."
                 }
            };

            context.Recipes.AddOrUpdate(r => r.RecipeName, recipes);

        }
    }
}
