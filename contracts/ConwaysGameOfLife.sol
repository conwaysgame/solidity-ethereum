// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract ConwaysGameOfLife {
  string world;
  uint width;

  constructor() {
    world = '.O.....O..OOO............';
    width = 5;
  }

  receive() external payable {
    // numberOfDeposits = numberOfDeposits + 1;
    // // More than 0.0001
    // if (msg.value > 1000000000000000) {
    //     lastTransaction = "ResetBoard";
    // } else {
    //     lastTransaction = "Step";
    // }
    // emit Received(msg.sender, msg.value);
    // payable(dansAddress).transfer(msg.value);
  }

  fallback() external payable {  }

  function getWorld() public view returns(string memory) {
    return world;
  }

  function getWidth() public view returns(uint) {
    return width;
  }

  function setWorld(string memory newWorld) public returns(bool success) {
    world = newWorld;
  }

  function setWidth(uint newWidth) public returns(bool success) {
    width = newWidth;
  }

  function nextBoard() private returns(string memory) {
    // bytes memory worldBytes = bytes(world)[i+begin-1]
    // for(uint i; i < world.length; i++) {
    // }
  }
}
