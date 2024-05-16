
namespace CursoAspnetCore.API.Models
{
    public class Servico
    {

        public int Id { get; set; }

        public string Titulo { get; set; }

        public string Descricao { get; set; }

        public Prioridade Prioridade { get; set; }

        public Servico() { }

        public Servico(int id)
        {
            Id = id;
        }


    }
}