var Web3 = require('web3');
var TruffleContract = require('truffle-contract');

App = {
  web3Provider: null,
  contracts: {},
  currentAccount: {},
  initWeb3: async function () {
    console.log('Mode is', process.env.MODE);
    if (process.env.MODE == 'development' || typeof window.web3 === 'undefined') {
      console.log('Connecting to', process.env.LOCAL_NODE);
      App.web3Provider = new Web3.providers.HttpProvider(process.env.LOCAL_NODE);
    }
    if (process.env.MODE == 'production') {
      console.log('Connecting to', process.env.REMOTE_NODE);
      App.web3Provider = new Web3.providers.HttpProvider(process.env.REMOTE_NODE);
    }
    else {
      App.web3Provider = web3.currentProvider;
    }
    web3 = new Web3(App.web3Provider);
    return await App.initContractConwaysGameOfLife();
  },
  initContractConwaysGameOfLife: async function () {
    await $.getJSON('ConwaysGameOfLife.json', function (data) {
      var ConwaysGameOfLifeArtifact = data;
      App.contracts.ConwaysGameOfLife = TruffleContract(ConwaysGameOfLifeArtifact);
      App.contracts.ConwaysGameOfLife.setProvider(App.web3Provider);
    })
    return App.bindEvents();
  },
  bindEvents: function () {
    $('#buttonSave').click(App.setName);
    $('#buttonMessage').click(App.loadMessage);
  },
  loadMessage: function () {
    App.contracts.ConwaysGameOfLife.deployed().then(async function (instance) {
      // let message;
      // if (App.currentAccount.length) {
      //   message = await instance.getWorld.call({ from: App.currentAccount });
      // } else {
      let message = await instance.getWorld.call();
      // }
      App.showMessage(message);
    }).catch((err) => {
      App.showError(err);
    })
  },
  pollForWorld: function () {
    App.contracts.ConwaysGameOfLife.deployed().then(async function (instance) {
      setInterval(async () => {
        console.log('Getting world')
        let message = await instance.getWorld.call();
        const gameOfLife = message.match(/.{1,5}/g)
        console.log('World gotten')
        App.setWorldDisplay(gameOfLife.join('<br />'));
        // App.loadMessage()
      }, 500);
      // let message;
      // if (App.currentAccount.length) {
      //   message = await instance.getWorld.call({ from: App.currentAccount });
      // } else {
      // let message = await instance.getWorld.call();
      // }
    }).catch((err) => {
      App.showError(err);
    })
  },
  showMessage: function (msg) {
    $('#output').html(msg.toString());
    $('#errorHolder').hide();
    $('#output').show();
  },
  setWorldDisplay: function (msg) {
    $('#worldDisplay').html(msg.toString());
    $('#errorHolder').hide();
    $('#worldDisplay').show();
  },
  showError: function (err) {
    $('#errorHolder').html(err.toString());
    $('#errorHolder').show();
    $('#output').hide();
  },
  setName: function () {
    if ($('#name').val()) {
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          App.showError(error);
        }
        App.currentAccount = accounts[0];
        App.contracts.ConwaysGameOfLife.deployed().then(function (instance) {
          return instance.setName.sendTransaction($('#name').val(), { from: App.currentAccount })
        }).then(function (result) {
          App.showMessage('Saved Successfully');
        }).catch(function (error) {
          App.showError(error);
        })
      })
    }
    else {
      App.showError('Error: Name is required.');
    }

  },
  init: async function () {
    await App.initWeb3();
    // const interval = setInterval(() => App.loadMessage(), 500);
    // App.loadMessage();
    App.pollForWorld();
  }

}

$(function () {
  $(window).load(function () {
    $('#errorHolder').hide();
    $('#output').hide();

    App.init();
  });
});