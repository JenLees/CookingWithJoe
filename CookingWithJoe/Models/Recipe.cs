using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CookingWithJoe.Models
{
    public class Recipe 
    {
        public int RecipeId { get; set; }

        [DisplayName("Recipe Name")]
        [Required(ErrorMessage = "Please enter a name for your delicious creation.")]
        public string RecipeName { get; set; }

        [Required(ErrorMessage = "Please enter ingredients. How can we make your delicious creation without ingredients? ")]
        [DataType(DataType.MultilineText)]
        public string Ingredients { get; set; }

        [Required(ErrorMessage = "Please enter your directions so we know how to recreate your delicious creation.")]
        [DataType(DataType.MultilineText)]
        public string Directions { get; set; }

    }
}
   