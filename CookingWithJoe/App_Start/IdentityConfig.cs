using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using CookingWithJoe.Models;
using System.Web;
using System.Web.Mvc;
using System.Linq;

namespace CookingWithJoe
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
        public class ApplicationRoleManager : RoleManager<IdentityRole>
        {
            public ApplicationRoleManager(IRoleStore<IdentityRole, string> roleStore)
                : base(roleStore)
            { }

            public static ApplicationRoleManager Create(
                IdentityFactoryOptions<ApplicationRoleManager> options,
                IOwinContext context)
            {
                var manager = new ApplicationRoleManager(
                    new RoleStore<IdentityRole>(context.Get<ApplicationDbContext>()));
                return manager;
            }
            public class TestController : Controller
            {
                // GET: Test
                public async Task<ActionResult> CreateUser()
                {
                    // Create a new user
                    var newUser = new ApplicationUser
                    {
                        UserName = "Jen",
                        Email = "celestialarcher@gmail.com"
                    };

                    // Use the Application User Manager to create the user 
                    var userManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
                    var result = await userManager.CreateAsync(newUser, password: "Secret123!");

                    // Return the result
                    if (result.Succeeded)
                    {
                        return Content("Created User!");
                    }
                    else
                    {
                        return Content("Could not create user: " + result.Errors.FirstOrDefault());
                    }
                }

            }
        }
    }
}

