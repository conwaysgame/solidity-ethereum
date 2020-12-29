var ConwaysGameOfLife = artifacts.require('ConwaysGameOfLife');
 
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(ConwaysGameOfLife);
};