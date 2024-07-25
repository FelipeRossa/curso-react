import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Menu() {
    return (

        <Navbar bg="dark" expand="lg" className="navbar-expand-lg bg-primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={NavLink} to={'/'}>SKC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>

                        <Nav.Link 
                            as={NavLink} to={'/cliente/lista'}>
                            Clientes
                        </Nav.Link>
                        <br />
                        <Nav.Link as={NavLink} to={'/servico/lista'}>
                            Servicos
                        </Nav.Link>

                        <NavDropdown align='end' title="Felipe" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Configurações</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>



                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
