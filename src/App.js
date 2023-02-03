import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import NFTCreator from './components/NFTCreator';
import Container from 'react-bootstrap/Container';
import Web3 from 'web3';
import { useDispatch } from 'react-redux';
import { changeAddress } from './reducers/addressSlice'
import { useEffect, useState } from 'react';
import NFtizer from 'contracts/Nftizer.sol/NFtizer.json'


function App() {

    const ethereum = window.ethereum;
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [data, setData] = useState({
        contractData: {},
        contractAddress: '',
        loading: true,
    })
    
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("No Web3 Provider installed in Browser. Please install Metamask");
        }

    const loadContactData = async() => {
        const web3 = window.web3;
        const NFtizerContractData = await new web3.eth.Contract(NFtizer.abi, "0xCF66BAE45A9BbfDCae4E9D5c9E3FAb07797C5F25");
        setData({
            contractData: NFtizerContractData,
            contractAddress: '0xCF66BAE45A9BbfDCae4E9D5c9E3FAb07797C5F25',
            loading: false,
        })
    }

    ethereum.on('accountsChanged', (accounts) => {
        dispatch(changeAddress(accounts[0]))
    })

    useEffect(() => {
        loadContactData();
    }, [])


    return (
        <Router>
            <Container fluid className="App g-0">
                <NavigationBar/>
                <Routes>
                    <Route exact path="/" element={<Home error={error} data={data}/>}/>
                    <Route path='/createnft' element={<NFTCreator data={data}/>} />
                </Routes>
            </Container>
        </Router>  
    );
}

export default App;
