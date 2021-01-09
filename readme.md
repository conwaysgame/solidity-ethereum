## Deploy to a local blockchain

1. Start Ganache
2. Run `truffle migrate`
3. Copy the contract address

## Deploy to rinkeby

1. Run `truffle migrate --network rinkeby`
2. Copy the contract address

## How to use it locally

1. Go to `truffle develop`

```js
let instance = await ConwaysGameOfLife.deployed()
let accounts = await web3.eth.getAccounts()
instance.getWorld()
// Put the contract's address here
// Address on Rinkeby
// web3.eth.getBalance('0x2A28BC11796A1AA8c14589bC159BD33488a5Dc03')
web3.eth.getBalance('0x046b51cB654146df1c90952b392F588b4Be72AfD')
web3.eth.getBalance(accounts[0])

// Enough - needs a fair bit of gas!
web3.eth.sendTransaction({to: '0x046b51cB654146df1c90952b392F588b4Be72AfD', from: accounts[0], value: 10000000000000, gas: 3000000})
// Not enough
web3.eth.sendTransaction({to: '0x046b51cB654146df1c90952b392F588b4Be72AfD', from: accounts[0], value: 1000000000000000, gas: 3000000})

instance.getWorld()
```

## How to use it on the web

## Optimisation

### V0.0.2

* Changed optimise for solc to 200 runs
* Using uint8 for numLiveNeighbours
* Worldlength up top

Typical Gas Price: 402278 somehow higher 🤔

### V0.0.1

Typical Gas Price: 276482