using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using ProServico.Data.Context;
using ProServico.Domain.Interfaces.Repositories;
using ProServico.Data.Repositories;
using ProServico.Domain.Interfaces.Services;
using ProServico.Domain.Services;

namespace CursoAspnetCore.API
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(
                options => options.UseSqlite(Configuration.GetConnectionString("Default"))

            );

            services.AddScoped<IServicoRepo, ServicoRepo>();
            services.AddScoped<IGeralRepo, GeralRepo>();
            services.AddScoped<IServicoService, ServicoService>();

            services.AddControllers().AddJsonOptions(op =>
                op.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter())
            );
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CursoAspnetCore.API", Version = "v1" });
            });

            services.AddCors();


            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CursoAspnetCore.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(option => option.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
