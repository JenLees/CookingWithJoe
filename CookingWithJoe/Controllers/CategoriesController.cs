using CookingWithJoe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CookingWithJoe.Controllers
{
    public class CategoriesController : ApiController
    {
        private ApplicationDbContext _db = new ApplicationDbContext();

        // GET: api/Categories
        public IEnumerable<Category> Get()
        {
            return _db.Categories.OrderBy(c => c.CategoryName).ToList();
        }

        // GET: api/Categories/5
        public HttpResponseMessage Get(int id)
        {
            var category = _db.Categories.Find(id);
            if (category == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, category);
        }
    }
}

      