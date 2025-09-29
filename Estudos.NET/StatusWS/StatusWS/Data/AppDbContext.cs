using Microsoft.EntityFrameworkCore;
using StatusWS.Models;

namespace StatusWS.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<StatusType> StatusTypes { get; set; }

    }
}