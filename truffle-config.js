const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();
 
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },    
    rinkeby:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,process.env.REMOTE_NODE),
      network_id: 4
    }  
  },
 
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 500
      },
      version: '0.7.4'
    }
  }
};