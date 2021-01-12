import Web3 from "web3";
import TruffleContract from "truffle-contract";
import detectEthereumProvider from '@metamask/detect-provider'

class App {
  constructor() {
    this.web3Provider = null;
    this.web3 = null;
    this.contracts = {};
    this.currentAccount = {};
    this.networkType = 'rinkeby';
  }

  async initWeb3() {
    console.log("The mode is", process.env.MODE);

    if (
      process.env.MODE == "development" ||
      typeof window.web3 === "undefined"
    ) {
      console.log('Dev mode loading');
      this.showMessage(
        `➡ Connecting to the network at ${process.env.LOCAL_NODE}.`
      );
      this.showAddress(process.env.LOCAL_CONTRACT_ADDRESS);
      this.web3Provider = new Web3.providers.HttpProvider(
        process.env.LOCAL_NODE
      );
    }

    if (process.env.MODE === "production" && typeof window.web3 === "undefined") {
      console.log('Prod mode loading');
      this.showMessage(
        `➡ Connecting to the network at ${process.env.REMOTE_NODE}.`
      );
      this.showAddress(process.env.REMOTE_CONTRACT_ADDRESS);
      this.web3Provider = new Web3.providers.HttpProvider(
        process.env.REMOTE_NODE
      );
    } else if (process.env.MODE === 'production') {
      console.log('Using the current provider.');
      this.showMessage(`➡ Connecting to the network using current provider.`);
      this.web3Provider = web3.currentProvider;
      this.showAddress(process.env.REMOTE_CONTRACT_ADDRESS);
    }

    this.web3 = new Web3(this.web3Provider);

    console.log(await detectEthereumProvider());

    try {
      this.networkType = await this.web3.eth.net.getNetworkType();

      console.log('Network Type is ', this.networkType);

      if (this.networkType !== 'rinkeby' && this.networkType !== 'private' ) {
        this.showMessage(`Please switch your wallet to use the Rinkeby Testnet, you are currently on ${this.networkType}. Then, refresh!`);
        return false;
      }
    } catch (e) {
      console.error('Failed to detect network type. Probably no metamask installed.')
      console.error(e);
    }

    return await this.initContractConwaysGameOfLife();
  }

  async initContractConwaysGameOfLife() {
    this.showMessage(`➡ Loading contract data.`);
    return await $.getJSON("ConwaysGameOfLife.json", (data) => {
      this.showMessage(`➡ Contract data loaded.`);
      const ConwaysGameOfLifeArtifact = data;
      this.contracts.ConwaysGameOfLife = TruffleContract(
        ConwaysGameOfLifeArtifact
      );
      this.contracts.ConwaysGameOfLife.setProvider(this.web3Provider);
    });
  }

  loadMessage() {
    this.contracts.ConwaysGameOfLife.deployed()
      .then(async (instance) => {
        let message = await instance.getWorld.call();
        this.showMessage(message);
      })
      .catch((err) => {
        this.showError(err);
      });
  }

  pollForWorld() {
    this.showMessage(`➡ Fetching state of Conway's Game of Life.`);
    this.contracts.ConwaysGameOfLife.deployed()
      .then(async (instance) => {
        this.poll = setInterval(async () => {
          const message = await instance.getWorld.call();
          const gameOfLife = message.match(/.{1,5}/g);
          this.showMessage(`✓ Continually polling for latest world state.`);
          this.setWorldDisplay(gameOfLife.join("<br />"));
        }, 500);
      })
      .catch((err) => {
        this.showError(err);
      });
  }

  async enableEthereum() {
    if(window.ethereum) {
      await ethereum.enable();
      return await this.resolveAccount();
    }
  }

  async resolveAccount() {
    // Should use this.web3 maybe??
    let accounts = await this.web3.eth.getAccounts();
    this.currentAccount = accounts[0];
    this.web3.eth.defaultAccount = accounts[0];
    console.log(`Default account is ${web3.eth.defaultAccount}/${this.currentAccount}`);
  }

  showAddress() {
    if (typeof web3 !== 'undefined') {
      $(".ethAddress").text(process.env.REMOTE_CONTRACT_ADDRESS);
      $(".ethAddressLink").attr('title', `Click to send 0.0001ETH to ${process.env.REMOTE_CONTRACT_ADDRESS}`);
      $(".ethAddressLink").attr('href', `#`);
      $(".ethAddressLink").unbind('click');
      $(".ethAddressLink").click(async e => {
        await this.enableEthereum();
        console.log(`Going to start sending from ${this.currentAccount}`)
        e.preventDefault();
        this.web3.eth.sendTransaction({
          to: process.env.REMOTE_CONTRACT_ADDRESS,
          from: this.currentAccount,
          value: 10000000000000
        }, (err, transactionId) => {
          if (err) {
            console.log('Payment failed', err);
          } else {
            console.log('Payment has gone through, will start polling for info');
            const txInfoInterval = setInterval(() => {
              this.web3.eth.getTransactionReceipt(transactionId, (e, data) => {
                if (!data) {
                  console.log('No transaction found with ID ' + transactionId);
                } else if (e) {
                  clearInterval(txInfoInterval);
                  console.log(e);
                } else {
                  clearInterval(txInfoInterval);
                  console.log(data);
                  if(!data.status) {
                    if (data.gasUsed < 400000) {
                      this.showError(`The transaction failed, possibly because you only provided ${data.gasUsed}. I recommend you provide at least 400000 gas for this to work.`)
                    } else {
                      this.showError('The transaction failed, not sure why. Check the console for more details.')
                    }
                  } else {
                    this.showSuccess('The transaction succeeded, you should see the world change very soon.')
                  }
                }
              });
            }, 500);
          }
        })
      });
    }
  }

  showMessage(msg) {
    $("#output").html(msg.toString());
    $("#output").show();
  }

  setWorldDisplay(msg) {
    $("#worldDisplay").html(msg.toString());
    $("#worldDisplay").show();
  }

  showError(err) {
    $("#errorHolder").html(err.toString());
    $("#errorHolder").show();
  }

  showSuccess(message) {
    $("#successHolder").html(message.toString());
    $("#successHolder").show();
  }

  async init() {
    const initiated = await this.initWeb3();
    if (initiated) {
      this.pollForWorld();
    }
  }
}

$(function () {
  $(window).load(function () {
    $("#errorHolder").hide();
    $("#output").hide();

    $("#errorHolder, #successHolder").click(function () {
      $(this).hide();
    });

    const app = new App();
    app.init();
  });
});
