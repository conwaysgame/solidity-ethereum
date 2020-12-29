pragma solidity ^0.7.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ConwaysGameOfLife.sol";

contract TestConwaysGameOfLife {
  // This is a conventional way to ensure the test contract has a balance.
  // Truffle will essentially send TestConwaysGameOfLife 1 ether.
  uint public initialBalance = 1 ether;

  function testInitialWorld() public {
    ConwaysGameOfLife instance = ConwaysGameOfLife(DeployedAddresses.ConwaysGameOfLife());

    string memory expected = '.O...\n..O..\nOOO..\n.....\n.....';

    Assert.equal(instance.getWorld(), expected, "World should be a glider initially");
  }
}