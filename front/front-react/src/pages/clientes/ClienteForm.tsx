import { Button } from 'react-bootstrap'
import TitlePage from '../../components/TitlePage'
import { useNavigate, useParams } from 'react-router-dom';

export default function ClienteForm() {
    const navigate = useNavigate();
    let { id } = useParams();

    return (
        <>
            <TitlePage tituloPagina={'Cliente ' + (id != null ? id : '')}>
                <Button variant='outline-warning' onClick={() => navigate('/cliente/lista')}>
                    <i className="fas fa-arrow-left me-2"></i>
                    Voltar
                </Button>
            </TitlePage>
            <div>

            </div>
        </>
    )
}
