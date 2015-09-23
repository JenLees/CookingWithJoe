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
        private ApplicationDbContext _db = new ApplicationDbContext();

        // GET: api/Recipes
        public IEnumerable<Recipe> Get()
        {
            return _db.Recipes.OrderBy(n => n.RecipeName).ToList();
        }

        // GET: api/Recipes/5
        public HttpResponseMessage Get (int id)
        {
            var recipe = _db.Recipes.Find(id);
            if (recipe == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, recipe);
        }

        // POST: api/Recipes
        [Authorize]
        public HttpResponseMessage Post(Recipe recipe)
        {
            if (ModelState.IsValid)
            {
                if (recipe.Id== 0)
                {
                    _db.Recipes.Add(recipe);
                    _db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created, recipe);
                }
                else
                {
                    var original = _db.Recipes.Find(recipe.Id);
                    original.RecipeName = recipe.RecipeName;
                    _db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, recipe);

                }
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);
        }

        // PUT: api/Recipes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Recipes/5
        [Authorize]
        public HttpResponseMessage Delete(int id)
        {
            var recipe = _db.Recipes.Find(id);
            if (recipe == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            _db.Recipes.Remove(recipe);
            _db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}