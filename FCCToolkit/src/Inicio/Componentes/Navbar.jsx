import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavPrincipal() {
    return (
        <>
            <Navbar bg="danger" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/tdvgen">FCCToolkit</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/tdvgen">TDV Generador </Nav.Link>
                        <Nav.Link href="/opscon">OPS Sobre conjuntos</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default NavPrincipal;