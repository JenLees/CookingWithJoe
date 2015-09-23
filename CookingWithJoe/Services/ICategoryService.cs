using System.Collections.Generic;
using CookingWithJoe.Models;

namespace CookingWithJoe.Services
{
    public interface ICategoryService
    {
        void CreateCategory(Category category);
        void DeleteCategory(int id);
        void EditCategory(Category category);
        Category FindCategory(int id);
        IList<Category> ListCategories();
    }
}