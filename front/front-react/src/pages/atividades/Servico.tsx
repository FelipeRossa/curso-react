import { useEffect, useState } from 'react';

import ServicoLista from './ServicoLista';
import api from '../../api/servico';
import { Button, Modal } from 'react-bootstrap';
import TitlePage from '../../components/TitlePage';
import ServicoForm from './ServicoForm';


let initialState: any[] | (() => any[]) = [];

export default function Servico() {
  const [showServModal, setShowServModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const [index] = useState(0);
  const [servicos, setServicos] = useState(initialState);
  const [servico, setServico] = useState({ id: 0 });

  const handleServModal = () => setShowServModal(!showServModal);

  const handleConfirmModal = (id: number) => {
    if (id !== 0 && id !== undefined) {
      const servicoFiltrado = servicos.filter(serv => serv.id === id);
      setServico(servicoFiltrado[0]);

    } else {
      setServico({ id: 0 });
    }
    setSmShowConfirmModal(!smShowConfirmModal)
  };

  const pegarTodosServicos = async () => {
    const response = await api.get('Servico');

    return response.data;
  }

  const novoServico = () => {
    setServico({ id: 0 })
    handleServModal()
  }

  useEffect(() => {
    const getServicos = async () => {
      const todosServicos = await pegarTodosServicos();
      if (todosServicos)
        setServicos(todosServicos);
    }

    getServicos();
  }, [])

  const addServico = async (serv: any) => {
    const response = await api.post('servico', serv);
    setServicos([...servicos, response.data])
    handleServModal()
  }

  const deletarservico = async (id: number) => {
    handleConfirmModal(0);
    if (await api.delete(`servico/${id}`)) {
      const servicosFiltrados = servicos.filter(serv => serv.id != id);

      setServicos([...servicosFiltrados]);
    }

  }

  function getServico(id: number) {
    const servicoFiltrado = servicos.filter(serv => serv.id === id);
    setServico(servicoFiltrado[0]);
    handleServModal();
  }

  function maxValueServicos() {
    return Math.max.apply(Math, servicos.map(item => item.id)) + 1;
  }

  function cancelarServico() {
    setServico({ id: 0 })
    handleServModal()
  }

  const atualizarServico = async (servicoEdicao: any) => {
    const response = await api.put(`servico/${servicoEdicao.id}`, servicoEdicao);
    const { id } = response.data;
    setServicos(servicos.map(item => item.id == id ? response.data : item))

    setServico({ id: 0 })
    handleServModal()
  }

  return (
    <>
      <TitlePage
        tituloPagina = {'Serviço: ' + (servico.id != 0 ? servico.id : '')}
      >
        <Button variant="outline-secondery" onClick={novoServico}>
                <i className='fas fa-plus'></i>
        </Button>
      </TitlePage>

      <ServicoLista
        servicos={servicos}
        getServico={getServico}
        handleConfirmModal={handleConfirmModal}
      />

      <Modal show={showServModal} onHide={handleServModal}>
        <Modal.Header closeButton>
          <Modal.Title>Serviço {servico.id != 0 ? servico.id : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServicoForm
            addServico={addServico}
            servicos={servicos}
            cancelarServico={cancelarServico}
            servicoSelecionado={servico}
            maxValueServicos={maxValueServicos}
            atualizarServico={atualizarServico}
          />
        </Modal.Body>
      </Modal>

      <Modal size='sm'
        show={smShowConfirmModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Excluindo servico{' '}  {servico.id != 0 ? servico.id : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o servico {servico.id}
        </Modal.Body>
        <Modal.Footer className='d-flex justfy-content-between'>
          <button className="btn btn-outline-success me-2" onClick={() => deletarservico(servico.id)}>
            <i className='fas fa-check me-2'></i>
            Sim
          </button>

          <button className="btn btn-danger me-2" onClick={() => handleConfirmModal(0)}>
            <i className='fas fa-check me-2'></i>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

