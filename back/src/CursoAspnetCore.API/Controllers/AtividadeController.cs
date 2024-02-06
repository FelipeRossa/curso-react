using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CursoAspnetCore.API.Models;

namespace CursoAspnetCore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {

        public IEnumerable<Servico> Servicos = new List<Servico>() {
                new Servico(1),
                new Servico(2),
                new Servico(3)
            };

        [HttpGet]
        public IEnumerable<Servico> get()
        {
            return Servicos;
        }

        [HttpPost]
        public IEnumerable<Servico> Post(Servico servico)
        {
            return Servicos.Append<Servico>(servico);
        }

        [HttpGet("{id}")]
        public Servico get(int id)
        {
            return Servicos.FirstOrDefault(serv => serv.Id == id);
        }

        [HttpPut("{id}")]
        public Servico Put(int id, Servico servico)
        {
            servico.Id = servico.Id + 5;
            return servico;
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Delete com prametro: {id}!";
        }

    }
}