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