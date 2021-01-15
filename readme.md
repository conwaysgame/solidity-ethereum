# "Quick" Start

## Environment variables

First things first, create a file called `.env`. It will look something like this.

```
PORT=3000
MODE="development"
LOCAL_NODE="http://localhost:7545"
REMOTE_NODE="https://rinkeby.infura.io/v3/<SOME ID>"
MNEMONIC = "blah blah blah blah"
```

`LOCAL_NODE` is the address of a local blockchain you're going to run.

`REMOTE_NODE` refers to the one you're going to deploy to remotely. Probably a test network, the main Ethereum net is probably too expensive to make this deploy worthwhile. You can get an endpoint to deploy from via https://infura.io/register.

The `MNEMONIC` is the mnemonic for accessing the wallet you'll use to pay the gas for deploying the contract on a remote node like Rinkeby. Make sure that wallet has enough ETH in it.

## Deploy to a local blockchain

1. Install [Ganache](https://www.trufflesuite.com/ganache)
2. Start Ganache and do "Quickstart"
3. Run `npm start`
4. Run `truffle migrate` in this directory
5. You should see two mirations. The one called `1609276627_conways_game_of_life` should have a `contract address:` - copy down the value somewhere.

## Deploy to rinkeby

1. Run `truffle migrate --network rinkeby`
2. You should see two mirations. The one called `1609276627_conways_game_of_life` should have a `contract address:` - copy down the value somewhere.

## Start the web app

```
npm install
```

Then in one shell run `npm start` and `npm run webpack` in another.

Go to http://localhost:3000 and you should see the board.

## Get onto the console

1. Go to `truffle develop`/`truffle console --network rinkeby`

```js
let instance = await ConwaysGameOfLife.deployed()
let accounts = await web3.eth.getAccounts()
// Set this to whatever the contract address from `migrate` was
let contractAddress = '0xafA9d2104F451Ad597aBf0CAf11D4426C9991902'

// Let's send the contract some ETH
await web3.eth.sendTransaction({to: contractAddress, from: accounts[0], value: 1000000000000000, gas: 3000000})

// This should show you what the world currently looks like
instance.getWorld()
instance.world.call()

// Make sure it has some ETH to pay the gas costs of `getWorld`
web3.eth.getBalance(contractAddress)

// Make sure the address we are using has ETH
web3.eth.getBalance(accounts[0])

// Send the exact right amount to step the world, and make sure the gas price is high enough
web3.eth.sendTransaction({to: contractAddress, from: accounts[0], value: 10000000000000, gas: 3000000})

// Check the world again
instance.getWorld()
```


## Optimisation

### V0.0.2

* Changed optimise for solc to 200 runs
* Using uint8 for numLiveNeighbours
* Worldlength up top

Typical Gas Price: 402278 somehow higher 🤔

### V0.0.1

Typical Gas Price: 276482