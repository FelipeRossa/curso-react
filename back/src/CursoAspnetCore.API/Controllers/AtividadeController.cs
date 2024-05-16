using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CursoAspnetCore.API.Models;
using CursoAspnetCore.API.Data;

namespace CursoAspnetCore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public IEnumerable<Servico> get()
        {
            return _context.Servicos;
        }

        [HttpPost]
        public IEnumerable<Servico> Post(Servico servico)
        {
            _context.Servicos.Add(servico);
            if (_context.SaveChanges() > 0)
            {
                return _context.Servicos;
            }
            else
            {
                throw new Exception("Não foi possivel adicionar");
            }

        }

        [HttpGet("{id}")]
        public Servico get(int id)
        {
            return _context.Servicos.FirstOrDefault(serv => serv.Id == id);
        }

        [HttpPut("{id}")]
        public Servico Put(int id, Servico servico)
        {

            if (servico.Id != id)
            {
                throw new Exception("Você está tentando alterar o serviço errada!");
            }

            _context.Update(servico);
            if (_context.SaveChanges() > 0)
                return _context.Servicos.FirstOrDefault(serv => serv.Id == id);
            else
                return new Servico();

        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var servico = _context.Servicos.FirstOrDefault(serv => serv.Id == id);
            if (servico == null)
                throw new Exception("Não é possivel deletar objetos inexistentes");

            _context.Remove(servico);

            return _context.SaveChanges() > 0;
        }

    }
}