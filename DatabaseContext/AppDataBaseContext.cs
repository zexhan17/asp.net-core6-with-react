using GrowHub.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GrowHub.DatabaseContext
{
    public class AppDataBaseContext : IdentityDbContext<User>
    {
		public AppDataBaseContext(DbContextOptions options) : base (options){}
        public DbSet<Compaign> Compaigns { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Stat> Stats { get; set; }
        public DbSet<Message> Messages { get; set; }

    }
}
