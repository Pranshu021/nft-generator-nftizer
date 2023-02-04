import { useEffect, useState } from "react";
import {Row, Col, Form, Button, Alert, Modal} from "react-bootstrap";
import '../assets/css/home.css';
import { NFTStorage, File } from 'nft.storage';
import '../assets/css/nftCreator.css';
import MintNFT from "./MintNFT";

const NFTCreator = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [finalImageFile, setFinalImageFile] = useState();
    const [loadingState, setLoadingState] = useState({
        isLoading: false,
        loadingMessage: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [jsonData, setJsonData] = useState({});
    const [tokenData, setTokenData] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        
    const nftStorage = new NFTStorage({token: process.env.REACT_APP_NFTSTORAGE_API_KEY})
    const modal = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="warning">{loadingState.loadingMessage}</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
      )

    const handleNFTCreation = async(event) => {
        event.preventDefault();
        handleShow();
        storeNFT(event.target.NFTNameControl.value, event.target.NFTDescriptionControl.value)
    }

    const storeNFT = async(name, description) => {
        setLoadingState({
            isLoading: true,
            loadingMessage: "Storing Image and Metadata in IPFS Network. Please Wait...."
        })
        if(!jsonData.properties) {setJsonData({})}
        await nftStorage.store({
            name: name,
            description: description,
            image: finalImageFile,
            properties: jsonData.properties
        }).then((tokenData) => {
            setLoadingState({
                isLoading: true,
                loadingMessage: "Image and Metadata Uploaded Successfully. Minting NFT..."
            })
            setTokenData(tokenData);
            
        })
    }

    const fileFromPath = async(filepath, fileName) => {
        const fetchImage = await fetch(filepath);
        const imageBlob = await fetchImage.blob();
        let file_extension = selectedFile.name.split(".")[1];
        if(file_extension === 'jpg' || file_extension === 'jpeg') {file_extension = "jpeg"}
        const image = new File([imageBlob], selectedFile.name.split(".")[0], {type: 'image/'+ file_extension});
        setFinalImageFile(image)
        return image;
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleAttributeUpload = async(event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            try {
                const json_obj = JSON.parse(e.target.result);
                if(Object.keys(json_obj).length === 1 && json_obj.properties) {
                    setJsonData(json_obj);
                } else {
                    setErrorMessage("Invalid JSON. Properties json file should only have \"properties\" object")
                    return
                }
            } catch(error) {
                setErrorMessage(error.message);
            }
        };
    } 

    useEffect(() => {
        if (!selectedFile) {
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        fileFromPath(objectUrl)
    }, [selectedFile]);

    useEffect(() => {
        if(!jsonData) {
            return
        }
        
    }, [jsonData])

    return(
        <Row className="nftform-row g-0 mt-5">
            <Col lg={4} xs={12} sm={12} className="mx-auto">
                <Form className="NFTSubmissionForm" onSubmit={handleNFTCreation}>

                    <div className="title">Nftizer</div>
                    {/* <div className="subtitle">Create Your NFT</div> */}

                    <Form.Group controlId="NFTNameControl" className="input-Container">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name for your NFT" className="input-fields" required/>
                    </Form.Group>

                    <Form.Group controlId="NFTDescriptionControl">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Describe your Image..." className="input-fields"  required/>
                    </Form.Group>

                    <Form.Group controlId="NFTFormControl">
                        <Form.Label>Upload your image</Form.Label>
                        <Form.Control type="file" accept="image/png, image/jpeg" onChange={handleFileChange} required/>
                    </Form.Group>

                    <Form.Group controlId="NFTFormControl">
                        <Form.Label>Upload attributes JSON</Form.Label>
                        <Form.Control type="file" accept="text/json" onChange={handleAttributeUpload}/>
                    </Form.Group>

                    {errorMessage ? <Alert variant="danger" className="mt-2">{errorMessage}</Alert> : <></>}
                    
                    <Button type="submit" variant="success" className="mt-4 generate-nft-button btn btn-block" disabled={loadingState.isLoading}>Generate NFT</Button>
                    {/* <Button variant="primary" onClick={handleShow}></Button> */}
            
                </Form>
            </Col>
            {modal}
                
            {tokenData ? <MintNFT data={props.data} tokenData={tokenData} /> : <></>}
        </Row>
        
       
    )
}

export default NFTCreator;


// Create the minting code
// Create Display of ipfs elements before minting


/*
data.ipnft => CID of Token
data.url   => Metadata.json url
data.data.image.href => Image url
data.description => Description of token

*/

