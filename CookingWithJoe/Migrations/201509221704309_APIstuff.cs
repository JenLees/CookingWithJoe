namespace CookingWithJoe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class APIstuff : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Recipes", "Category_Id", c => c.Int());
            CreateIndex("dbo.Recipes", "Category_Id");
            AddForeignKey("dbo.Recipes", "Category_Id", "dbo.Categories", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Recipes", "Category_Id", "dbo.Categories");
            DropIndex("dbo.Recipes", new[] { "Category_Id" });
            DropColumn("dbo.Recipes", "Category_Id");
            DropTable("dbo.Categories");
        }
    }
}
