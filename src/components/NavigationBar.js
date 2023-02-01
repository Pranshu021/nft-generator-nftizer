import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/css/navbar.css';
import Connect from './Connect';

const NavigationBar = () => {

    return (
        <Navbar bg="dark" variant="dark" className="navbar">
            <Container>
                <Navbar.Brand href="#home">Nftizer</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Connect />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;