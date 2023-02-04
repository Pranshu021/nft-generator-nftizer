import { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';

const MintNFT = (props) => {
    const [transactionMessage, setTransactionMessage] = useState();
    // console.log(props.data.contractData.methods)
    useEffect(() => {
        const minting = async() => {
            const userAddress = JSON.parse(localStorage.getItem("address"))
            // console.log(userAddress)
            await props.data.contractData.methods.mintNFT(userAddress, props.tokenData.url).send({from: props.data.ownerAddress}).on('receipt', (receipt) => {
                setTransactionMessage("Congratulations!! NFT Successfully Minted to your Address.")
                console.log(receipt)
                
            }).on('error', (error) => {
                setTransactionMessage(error.message)
            })
        }
        minting();
    }, [props.tokenData])

    return(<><Alert variant="success"></Alert></>)
}

export default MintNFT;
