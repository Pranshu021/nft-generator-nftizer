import { useEffect, useState } from "react";
import {Row, Col, Form, Button, Alert} from "react-bootstrap";
import '../assets/css/home.css';
import { NFTStorage, File } from 'nft.storage';
import '../assets/css/nftCreator.css';

const NFTCreator = (props) => {

    const [selectedFile, setSelectedFile] = useState();
    const [filepath, setFilePath] = useState();
    const [finalImageFile, setFinalImageFile] = useState();
    const [loadingState, setLoadingState] = useState({
        isLoading: false,
        loadingMessage: ""
    });
    
    const nftStorage = new NFTStorage({token: process.env.REACT_APP_NFTSTORAGE_API_KEY})

    const handleNFTCreation = async(event) => {
        event.preventDefault();
        storeNFT(event.target.NFTNameControl.value, event.target.NFTDescriptionControl.value)
    }

    const storeNFT = async(name, description) => {
        setLoadingState({
            isLoading: true,
            loadingMessage: "Storing Image and Metadata in IPFS Network. Please Wait...."
        })
        await nftStorage.store({
            name: name,
            description: description,
            image: finalImageFile
        }).then((tokenData) => {
            const nftData = "Metadata : " + tokenData.data.url + "\nImage : " + tokenData.data.image.href + "\n"
            setLoadingState({
                isLoading: true,
                loadingMessage: "Image and Metadata Successfully Stored on IPFS Network." + nftData + "Minting NFT....."
            })
        })
    }

    const fileFromPath = async(filepath, fileName) => {
        const fetchImage = await fetch(filepath);
        const imageBlob = await fetchImage.blob();
        let file_extension = selectedFile.name.split(".")[1];
        if(file_extension === 'jpg' || file_extension === 'jpeg') {file_extension = "jpeg"}
        const image = new File([imageBlob], selectedFile.name.split(".")[0], {type: 'image/'+ file_extension});
        console.log(image)
        setFinalImageFile(image)
        return image;
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
        console.log(event.target.files)
    }

    useEffect(() => {
        if (!selectedFile) {
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        console.log(objectUrl)
        setFilePath(objectUrl, selectedFile.name);
        fileFromPath(objectUrl)
    }, [selectedFile]);

    return(
        <Row className="nftform-row g-0 mt-5">
            <Col lg={4} xs={12} sm={12} className="mx-auto">
                <Form className="NFTSubmissionForm" onSubmit={handleNFTCreation}>

                    <div className="title">Nftizer</div>
                    <div className="subtitle">Create Your NFT</div>

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
                    
                    <Button type="submit" variant="success" className="mt-4 generate-nft-button btn btn-block" disabled={loadingState.isLoading}>Generate NFT</Button>
            
                </Form>
            </Col>
             {/* <Row className="mt-3">
            {loadingState.loadingMessage !== "" ? <Alert variant="warning">{loadingState.loadingMessage}</Alert> : <></>}
            </Row> */}
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
*/

