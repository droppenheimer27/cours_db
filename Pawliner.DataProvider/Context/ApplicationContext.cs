using Microsoft.EntityFrameworkCore;
using Pawliner.DataProvider.Models;

namespace Pawliner.DataProvider.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<AspNetUser> AspNetUsers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Executor> Executors { get; set; }
        public DbSet<Respond> Responds { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public ApplicationContext() : base()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(LocalDb)\\MSSQLLocalDB;Data Source=DESKTOP-4SN1FS6;Initial Catalog=Pawliner;Integrated Security=True");
        }
    }
}