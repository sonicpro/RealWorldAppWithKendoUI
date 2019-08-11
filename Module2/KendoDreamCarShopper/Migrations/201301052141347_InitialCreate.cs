namespace KendoDreamCarShopper.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Makes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 75),
                        ImageUrl = c.String(nullable: false, maxLength: 1024),
                        Location = c.String(nullable: false, maxLength: 140),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Models",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MakeId = c.Int(nullable: false),
                        Year = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 75),
                        Description = c.String(nullable: false, maxLength: 2000),
                        EngineType = c.String(nullable: false, maxLength: 75),
                        BreakHorsepower = c.Int(nullable: false),
                        ZeroToSixty = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TopSpeed = c.Int(nullable: false),
                        BasePrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Makes", t => t.MakeId)
                .Index(t => t.MakeId);
            
            CreateTable(
                "dbo.ModelImages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ModelId = c.Int(nullable: false),
                        HighResolutionUrl = c.String(nullable: false, maxLength: 1024),
                        LowResolutionUrl = c.String(nullable: false, maxLength: 1024),
                        Order = c.Int(nullable: false),
                        ShortDescription = c.String(nullable: false, maxLength: 25),
                        LongDescription = c.String(nullable: false, maxLength: 480),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Models", t => t.ModelId)
                .Index(t => t.ModelId);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false),
                        MakeId = c.Int(nullable: false),
                        ModelId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        TotalCharge = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Makes", t => t.MakeId)
                .ForeignKey("dbo.Models", t => t.ModelId)
                .Index(t => t.MakeId)
                .Index(t => t.ModelId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Orders", new[] { "ModelId" });
            DropIndex("dbo.Orders", new[] { "MakeId" });
            DropIndex("dbo.ModelImages", new[] { "ModelId" });
            DropIndex("dbo.Models", new[] { "MakeId" });
            DropForeignKey("dbo.Orders", "ModelId", "dbo.Models");
            DropForeignKey("dbo.Orders", "MakeId", "dbo.Makes");
            DropForeignKey("dbo.ModelImages", "ModelId", "dbo.Models");
            DropForeignKey("dbo.Models", "MakeId", "dbo.Makes");
            DropTable("dbo.Orders");
            DropTable("dbo.ModelImages");
            DropTable("dbo.Models");
            DropTable("dbo.Makes");
        }
    }
}
