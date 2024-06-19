import Servico from "./Servico";

export default function ServicoLista(props: any) {
    return (
        <div className='mt-3'>
            {props.servicos.map((servico: any) => (

                <Servico
                    key={servico.id}
                    servico={servico}
                    getServico={props.getServico}
                    handleConfirmModal={props.handleConfirmModal}
                />
            ))}
        </div>
    )
}
