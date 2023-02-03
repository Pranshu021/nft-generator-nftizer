import {Container, Row, Col, Alert, Button} from 'react-bootstrap';
import NFTCreator from './NFTCreator';
import '../assets/css/home.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if(props.error) {
        setError(props.error.message)
        return(<Alert variant="danger">{error}</Alert>)
    }

    
    return(
        // <Container>
        //     <Row className="header-row mt-4">
        //         <Col lg={12} xs={12}><h1>Nftizer</h1></Col>
        //     </Row>
        //     <Row className="description-row mt-2 mb-2">
        //         <Col lg={12} xs={12}><span className="description-text">Have a cool Picture ? Convert it into NFT and really Own it</span></Col>
        //     </Row>
        //     {<NFTCreator data={props.data}/>}
        // </Container>
        <Row className="homepage-row g-0">
            <Col lg={12} xs={12} className="intro-column">
                <h1 className='Heading'>Nftizer</h1>
                <span className="description">Have a cool Picture ? Convert it into NFT and really Own it</span>
                <Button className="redirect-button mt-3 btn btn-lg" variant="outline-danger" size="lg" onClick={() => {navigate('/createnft')}}>Create NFT</Button>
            </Col>
        </Row>
    )
}

export default Home;