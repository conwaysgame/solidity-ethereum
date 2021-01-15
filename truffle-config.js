const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();
 
module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },    
    ropsten:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,process.env.ROPSTEN_NODE),
      network_id: 3
    },
    rinkeby:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,process.env.REMOTE_NODE),
      network_id: 4
    },
    live:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,process.env.LIVE_NODE),
      network_id: 1,
      gasLimit: 1000000
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
        runs: 1000
      },
      version: '0.7.4'
    }
  }
};