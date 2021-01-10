const Web3 = require("web3");
const TruffleContract = require("truffle-contract");

class App {
  constructor() {
    this.web3Provider = null;
    this.contracts = {};
    this.currentAccount = {};
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
      $("#ethAddress").text(process.env.LOCAL_CONTRACT_ADDRESS);
      this.web3Provider = new Web3.providers.HttpProvider(
        process.env.LOCAL_NODE
      );
    }
    if (process.env.MODE === "production") {
      console.log('Prod mode loading');
      this.showMessage(
        `➡ Connecting to the network at ${process.env.REMOTE_NODE}.`
      );
      $("#ethAddress").text(process.env.REMOTE_CONTRACT_ADDRESS);
      this.web3Provider = new Web3.providers.HttpProvider(
        process.env.REMOTE_NODE
      );
    } else {
      console.log('Default mode loading');
      this.showMessage(`➡ Connecting to the network using current provider.`);
      this.web3Provider = web3.currentProvider;
    }
    web3 = new Web3(this.web3Provider);
    return await this.initContractConwaysGameOfLife();
  }

  async initContractConwaysGameOfLife() {
    this.showMessage(`➡ Loading contract data.`);
    await $.getJSON("ConwaysGameOfLife.json", (data) => {
      this.showMessage(`➡ Contract data loaded.`);
      const ConwaysGameOfLifeArtifact = data;
      this.contracts.ConwaysGameOfLife = TruffleContract(
        ConwaysGameOfLifeArtifact
      );
      this.contracts.ConwaysGameOfLife.setProvider(this.web3Provider);
    });
    return this.bindEvents();
  }

  bindEvents() {
    $("#buttonSave").click(this.setName);
    $("#buttonMessage").click(this.loadMessage);
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
          console.log("Fetched world");
          this.showMessage(`✓ Continually polling for latest world state.`);
          this.setWorldDisplay(gameOfLife.join("<br />"));
        }, 500);
      })
      .catch((err) => {
        this.showError(err);
      });
  }

  showMessage(msg) {
    $("#output").html(msg.toString());
    $("#errorHolder").hide();
    $("#output").show();
  }

  setWorldDisplay(msg) {
    $("#worldDisplay").html(msg.toString());
    $("#errorHolder").hide();
    $("#worldDisplay").show();
  }

  showError(err) {
    $("#errorHolder").html(err.toString());
    $("#errorHolder").show();
    $("#output").hide();
  }

  async init() {
    await this.initWeb3();
    this.pollForWorld();
  }
}

$(function () {
  $(window).load(function () {
    $("#errorHolder").hide();
    $("#output").hide();

    const app = new App();
    app.init();
  });
});
