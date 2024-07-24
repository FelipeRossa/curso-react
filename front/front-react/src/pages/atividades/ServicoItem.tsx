export default function ServicoItem(props: any) {

    function prioridadeLabel(param: string) {
        switch (param) {
            case 'Alta':
            case 'Normal':
            case 'Baixa':
                return param;
            default:
                return 'Não definido';
        }
    }

    function prioridadeSyle(param: string, icone: Boolean) {
        switch (param) {
            case 'Alta':
                return icone ? 'frown' : 'warning';
            case 'Normal':
                return icone ? 'meh' : 'black';
            case 'Baixa':
                return icone ? 'smile' : 'success';
            default:
                return 'Não definido';
        }
    }

    return (
        <div key={props.servico.id} className={"card mb-2 shadow border border-" + prioridadeSyle(props.servico.prioridade, false)} >
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">
                        <span className="badge rounded-pill bg-secondary me-1">{props.servico.id}</span>
                        - {props.servico.titulo}
                    </h5>

                    <h6 className="d-flex justify-content-between">
                        Prioridade:
                        <span className={'ms-1 text-' + prioridadeSyle(props.servico.prioridade, false)}>
                            <i className={"me-1 far fa-face-" + prioridadeSyle(props.servico.prioridade, true)}></i>
                            {prioridadeLabel(props.servico.prioridade)}
                        </span>

                    </h6>
                </div>
                <p className="card-text">{props.servico.descricao}</p>
                <div className="d-flex justify-content-end border-top pt-2 m-0">
                    <button className="btn btn-outline-primary me-2 btn-sm"
                        onClick={() => props.getServico(props.servico.id)}>
                        <i className="fas fa-pen me-2"></i>
                        Editar
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => props.handleConfirmModal(props.servico.id)}>
                        <i className="fas fa-trash me-2"></i>
                        Deletar
                    </button>
                </div>
            </div>
        </div>

    )
}