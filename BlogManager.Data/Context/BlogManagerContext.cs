using Microsoft.EntityFrameworkCore;

namespace BlogManager.Data.Context
{
    public class BlogManagerContext : DbContext
    {
        public BlogManagerContext(DbContextOptions<BlogManagerContext> options) : base(options)
        {
        }

        // DbSets go here
        // public DbSet<MyEntity> MyEntities { get; set; }
    }
}
