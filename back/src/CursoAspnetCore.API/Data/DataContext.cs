using Microsoft.EntityFrameworkCore;
using CursoAspnetCore.API.Models;

namespace CursoAspnetCore.API.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Servico> Servicos { get; set; }
    }
}