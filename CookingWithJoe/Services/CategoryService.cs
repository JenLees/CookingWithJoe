using CookingWithJoe.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CookingWithJoe.Services
{
    public class CategoryService : CookingWithJoe.Services.ICategoryService
    {
        private IGenericRepository _repo;

        public CategoryService(IGenericRepository repo)
        {
            _repo = repo;
        }

        public IList<Category> ListCategories()
        {
            return _repo.Query<Category>().ToList();
        }
        public Category FindCategory(int id)
        {
            return _repo.Find<Category>(id);
        }
        public void CreateCategory(Category category)
        {
            _repo.Add<Category>(category);
            _repo.SaveChanges();
        }
        public void EditCategory(Category category)
        {
            var original = this.FindCategory(category.Id);
            original.CategoryName = category.CategoryName;
        }
        public void DeleteCategory(int id)
        {
            _repo.Delete<Category>(id);
            _repo.SaveChanges();

        }

    }
}