import {Container, Row, Col, Alert} from 'react-bootstrap';
import NFTCreator from './NFTCreator';
import '../assets/css/home.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Home = (props) => {
    const [error, setError] = useState('');

    if(props.error) {
        setError(props.error.message)
        return(<Alert variant="danger">{error}</Alert>)
    }

    
    return(
        <Container>
            <Row className="header-row mt-4">
                <Col lg={12} xs={12}><h1>Nftizer</h1></Col>
            </Row>
            <Row className="description-row mt-3">
                <Col lg={12} xs={12}><span className="description-text">Have a cool Picture ? Convert it into NFT and really Own it</span></Col>
            </Row>
            {<NFTCreator data={props.data}/>}
        </Container>
    )
}

export default Home;