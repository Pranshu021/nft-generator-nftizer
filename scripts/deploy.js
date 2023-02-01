const { ethers } = require('hardhat');
require("dotenv").config();
// const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.API_KEY);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);



const main = async() => {
    const NFtizerContract = await ethers.getContractFactory('NFtizer');
    const nftizerContract = await NFtizerContract.deploy();
    await nftizerContract.deployed().then(console.log("[+] Nftizer Contract deployed at address : " + nftizerContract.address))
    .catch((error) => {
        console.log(error);
    })
}

main().catch((error) => {
    if(error) {
        console.error(error);
        process.exit(1);
    }
})

// Ganache Address : 0xCF66BAE45A9BbfDCae4E9D5c9E3FAb07797C5F25