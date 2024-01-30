import Servico from "./Servico";

export default function ServicoLista(props: any) {
    return (
        <div className='mt-3'>
            {props.servicos.map((servico: any) => (

                <Servico
                    servico={servico}
                    deletarservico={props.deletarservico}
                    getServico = {props.getServico}
                />
            ))}
        </div>
    )
}
