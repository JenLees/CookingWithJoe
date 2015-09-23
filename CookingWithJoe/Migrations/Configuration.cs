namespace CookingWithJoe.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Microsoft.AspNet.Identity.Owin;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Mvc;

    internal sealed class Configuration : DbMigrationsConfiguration<CookingWithJoe.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CookingWithJoe.Models.ApplicationDbContext context)
        {
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new ApplicationUserManager(userStore);

            // Ensure Jenny
            var user = userManager.FindByName("celestialarcher@gmail.com");
            if (user == null)
            {
                // create user
                user = new ApplicationUser
                {

                    UserName = "celestialarcher@gmail.com",
                    Email = "celestialarcher@gmail.com"
                };
                userManager.Create(user, "MyPassword!123");

                // add claims
                userManager.AddClaim(user.Id, new Claim("CanEditProducts", "true"));
                userManager.AddClaim(user.Id, new Claim(ClaimTypes.DateOfBirth, "12/25/1966"));
            }



            var recipes = new Recipe[] {
                         new Recipe{
                           RecipeName="Healthy Veggie Burritos",
                           Ingredients="Soy Chorizo, whole wheat tortillas, onions, zucchini, carrots, cheddar cheese, black beans, plain Greek yogurt, avocado",
                           Directions="Fry veggies, add chorizo, wrap in a tortilla and top with avocado, salsa, and yogurt."
                         }
                    };

            context.Recipes.AddOrUpdate(r => r.RecipeName, recipes);



            var categories = new Category[]
            {
                new Category
                {
                    CategoryName="Breakfast"
                }

            };

            context.Categories.AddOrUpdate(c => c.CategoryName, categories);

            }
    }
}
    
