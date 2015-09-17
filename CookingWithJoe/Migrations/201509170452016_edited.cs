namespace CookingWithJoe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edited : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Recipes",
                c => new
                    {
                        RecipeId = c.Int(nullable: false, identity: true),
                        RecipeName = c.String(nullable: false),
                        Ingredients = c.String(nullable: false),
                        Directions = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.RecipeId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Recipes");
        }
    }
}
