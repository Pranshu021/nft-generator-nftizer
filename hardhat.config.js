/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const {PRIVATE_KEY, PROVIDER_URL} = process.env;

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    "ganache": {
      url: "http://127.0.0.1:7545",
    },
    // "polygon_testnet": {
    //   url: PROVIDER_URL,
    //   accounts: [PRIVATE_KEY]
    // }
  } 
};

// Complete the Contracts and test them, try to add features if needed
// Make basic UI