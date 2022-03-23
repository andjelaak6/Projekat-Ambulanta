using Microsoft.EntityFrameworkCore;
using Models;
namespace Models{
    public class ProjekatContext : DbContext
    {
        public ProjekatContext(DbContextOptions options) : base(options) {}
        public DbSet<KovidAmbulanta> Ambulante {get; set;}
        public DbSet<KartonPacijenta> Kartoni {get; set;}
        public DbSet<Lek> Lekovi {get; set;}
        public DbSet<Terapija> Terapije {get; set;}

    }
}