namespace CookingWithJoe.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class moreApiStuff : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Categories", "CategoryName", c => c.String());
            DropColumn("dbo.Categories", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Categories", "Name", c => c.String());
            DropColumn("dbo.Categories", "CategoryName");
        }
    }
}
