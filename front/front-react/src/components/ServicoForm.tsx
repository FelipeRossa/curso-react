import { useEffect, useState } from "react";

const servicoInicial = {
    id: 0,
    prioridade: '0',
    descricao: '',
    titulo: ''
}

export default function ServicoForm(props: any) {
    const [servico, setServico] = useState(servicoAtual());

    useEffect(() => {
        if (props.servicoSelecionado.id != 0) {
            setServico(props.servicoSelecionado)
        }
    }, [props.servicoSelecionado]);

    const inputTextHandler = (e: any) => {
        const { name, value } = e.target;

        setServico({ ...servico, [name]: value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (props.servicoSelecionado.id != 0) {
            props.atualizarServico(servico);
        } else {
            props.addServico(servico);
        }

        setServico(servicoInicial);
    }

    function servicoAtual() {
        if (props.servicoSelecionado.id != 0) {
            return props.servicoSelecionado;

        } else {
            return servicoInicial;
        }
    }

    const cancelar = (e: any) => {
        e.preventDefault();

        props.cancelarServico();
        setServico(servicoInicial);
    }

    return (
        <>
            <form className='row g-3' onSubmit={handleSubmit}>
                <div className='col-md-6'>
                    <label className='form-label'>Título</label>
                    <input
                        name='titulo'
                        value={servico.titulo}
                        onChange={inputTextHandler}
                        id='titulo'
                        type="text"
                        className="form-control" />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Prioridade</label>
                    <select
                        name='prioridade'
                        value={servico.prioridade}
                        onChange={inputTextHandler}
                        id="prioridade" className="form-select">
                        <option defaultValue="Não Definifo">Selecionar...</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Normal">Normal</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>

                <div className='col-md-12'>
                    <label className='form-label'>Descrição</label>
                    <textarea
                        name='descricao'
                        value={servico.descricao}
                        onChange={inputTextHandler}
                        id='descricao'
                        className="form-control" />

                    <hr />
                </div>


                <div className='col-12 mt-0'>
                    {servico.id == 0 ? (
                        <button className='btn btn-outline-success' type="submit"><i className="fas fa-plus me-2"></i>Adicionar serviço</button>
                    ) : (
                        <>
                            <button className='btn btn-outline-success me-2' type="submit" ><i className="fas fa-plus me-2"></i>Salvar</button>
                            <button className='btn btn-outline-warning' onClick={cancelar}><i className="fas fa-plus me-2"></i>Cancelar</button>
                        </>
                    )}

                </div>
            </form>
        </>

    )
}