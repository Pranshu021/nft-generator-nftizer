import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import useLocalStorage from '../hooks/useLocalStorage';
import Web3 from 'web3';

const WalletConnect = (props) => {
    const ethereum = window.ethereum;
    const web3 = new Web3(ethereum); 
    const [metamaskLogin, setMetamaskLogin] = useState(false)
    const [address, setAddress] = useLocalStorage('address', '');
    const [currentAddress, setCurrentAddress] = useState(JSON.parse(localStorage.getItem("address")));

    const handleConnect = async(event) => {
        await web3.eth.requestAccounts()
        .then((accounts) => {
            setMetamaskLogin(true)
            setAddress(accounts[0])
        }).catch((error) => {
            console.log(error.message)
        })
    }

    const checkAcounts = async() => {
        await web3.eth.requestAccounts().then((account_data) => {
            if(account_data.length > 0) setMetamaskLogin(true)
        }).catch((error) => {
            console.log(error.message)    
        }) 
    }

    ethereum.on('accountsChanged', handleConnect);

    useEffect(() => {
        const user_address = localStorage.getItem('address');
        checkAcounts();
        if(user_address !== '""' && metamaskLogin) {
            setMetamaskLogin(true);
            setCurrentAddress(JSON.parse(user_address));
        }
     }, [address])

    return(
        <>
        {metamaskLogin ? <span className="navbar-address">Address : {currentAddress}</span> : <Button variant="primary" onClick={handleConnect}>Connect your Wallet</Button>}
        </>
    )

}

export default WalletConnect;