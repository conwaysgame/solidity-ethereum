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
    world = nextBoard();
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

  function nextBoard() private view returns(string memory) {
    bytes memory originalWorldBytes = bytes(world);
    bytes memory resultWorldBytes = new bytes(originalWorldBytes.length);

    // Maximum for this is 8, so 8 bits is more than enough
    uint8 numLiveNeighbours = 0;
    uint worldLength = originalWorldBytes.length;

    for(uint i=0;i<worldLength;i++) {
      numLiveNeighbours = 0;
      // Top left
      // if (i >= (width + 1)) {
      //   i - (width + 1)
      // }
      // if (i > 0) {
      //   if (originalWorldBytes)
      // }

      // This isn't quite right yet. It will not always check the correct one,
      // e.g. if the cell is on the right (i % width - 1 == 0) or the left (i % width == 0)
      // In those cases I think it should go back to the start or the end of the line

      // Top right
      // Unsigned int, needs to be compared weirdly
      if (i + 1 >= width) {
        if (originalWorldBytes[i + 1 - width] == byte('O')) {
          numLiveNeighbours++;
        }
      }

      // The one to the right of it
      if (i + 1 < worldLength) {
        if (originalWorldBytes[i + 1] == byte('O')) {
          numLiveNeighbours++;
        }
      }

      // Bottom left
      if (i + width - 1 < worldLength - 1) {
        if (originalWorldBytes[i + width - 1] == byte('O')) {
          numLiveNeighbours++;
        }
      }

      // Bottom right
      if (i + width + 1 < worldLength - 1) {
        if (originalWorldBytes[i + width + 1] == byte('O')) {
          numLiveNeighbours++;
        }
      }

      if (numLiveNeighbours == 3) {
        resultWorldBytes[i] = 'O';
      } else {
        resultWorldBytes[i] = '.';
      }
    }
    return string(resultWorldBytes);
  }
}
