
let instance = await ConwaysGameOfLife.deployed()
instance.getWorld()
let accounts = await web3.eth.getAccounts()
web3.eth.getBalance('0x54F2D7D7A53E8046F9eD368d33f6e266fF3868EC')
web3.eth.getBalance(accounts[0])

// Enough - needs a fair bit of gas!
web3.eth.sendTransaction({to: '0x54F2D7D7A53E8046F9eD368d33f6e266fF3868EC', from: accounts[0], value: 100000000000000, gas: 300000})
// Not enough
web3.eth.sendTransaction({to: '0x54F2D7D7A53E8046F9eD368d33f6e266fF3868EC', from: accounts[0], value: 10000000000000})