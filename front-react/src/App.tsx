import { useEffect, useState } from 'react';
import './App.css'
import ServicoForm from './components/ServicoForm';
import ServicoLista from './components/ServicoLista';

let initialState = [
  {
    id: 1,
    prioridade: '1',
    descricao: 'Corte de cabelo',
    titulo: 'Corte de Barba'
  },
  {
    id: 2,
    prioridade: '2',
    descricao: 'Corte de Barba',
    titulo: 'Corte de Barba'
  },
  {
    id: 3,
    prioridade: '3',
    descricao: 'Tatuagem',
    titulo: 'Corte de Barba'
  },
  {
    id: 4,
    prioridade: '3',
    descricao: 'Sombrancelha',
    titulo: 'Corte de Barba'
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [servicos, setServicos] = useState(initialState);
  const [servico, setServico] = useState({id: 0});

  useEffect(() => {
    servicos.length <= 0 ? setIndex(1) : setIndex(maxValueServicos())
  }, [servicos])

  function addServico(serv: any) {
    setServicos([...servicos, { ...serv, id: index }])
  }

  function deletarservico(id: number) {
    const servicosFiltrados = servicos.filter(serv => serv.id != id);

    setServicos([...servicosFiltrados]);
  }

  function getServico(id: number) {
    const servicoFiltrado = servicos.filter(serv => serv.id === id);
    setServico(servicoFiltrado[0]);
  }

  function maxValueServicos() {
    return Math.max.apply(Math, servicos.map(item => item.id)) + 1;
  }

  function cancelarServico() {
    setServico({ id: 0 })
  }

  function atualizarServico(ativ: any) {
    setServicos(servicos.map(item => item.id == ativ.id ? ativ : item))
    setServico({ id: 0 })
  }

  return (
    <>
      <ServicoForm
        addServico={addServico}
        servicos={servicos}
        cancelarServico={cancelarServico}
        servicoSelecionado={servico}
        maxValueServicos={maxValueServicos}
        atualizarServico={atualizarServico}
      />
      <ServicoLista
        servicos={servicos}
        deletarservico={deletarservico}
        getServico={getServico}
      />
    </>

  )
}
export default App
