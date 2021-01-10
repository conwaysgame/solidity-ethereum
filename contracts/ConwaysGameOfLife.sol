// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract ConwaysGameOfLife {
  string world;
  uint8 width;
  uint8 worldLength;

  constructor() {
    world = '.O.....O..OOO............';
    width = 5;
    worldLength = 25;
  }

  receive() external payable {
    // Greater than or equal to 0.00001
    // below this is just for gas
    if (msg.value >= 10000000000000) {
      world = nextBoard();
    }
  }

  fallback() external payable {  }

  function getWorld() public view returns(string memory) {
    return world;
  }

  function setWorld(string memory newWorld) public {
    world = newWorld;
  }

  function nextBoard() private view returns(string memory) {
    bytes memory originalWorldBytes = bytes(world);
    bytes memory resultWorldBytes = new bytes(originalWorldBytes.length);
    uint8 topEdgeDelta = 0;
    uint8 rightEdgeDelta = 0;
    uint8 bottomEdgeDelta = 0;
    uint8 leftEdgeDelta = 0;
    byte livingCell = byte('O');

    // Maximum for this is 8, so 8 bits is more than enough
    uint8 numLiveNeighbours = 0;

    for(uint8 i=0;i<worldLength;i++) {
      numLiveNeighbours = 0;
      topEdgeDelta = 0;
      rightEdgeDelta = 0;
      bottomEdgeDelta = 0;
      leftEdgeDelta = 0;

      // This is a top-edge cell
      if (i < width) {
        topEdgeDelta = worldLength;
      }

      // This is right-edge cell
      if ((i + 1) % width == 0) {
        rightEdgeDelta = width;
      }

      // This is a bottom-edge cell
      if (i + width > worldLength - 1) {
        bottomEdgeDelta = worldLength;
      }

      // This is a left-edge cell
      if ((i + width) % width == 0) {
        leftEdgeDelta = width;
      }

      // Top
      if (originalWorldBytes[i - width + topEdgeDelta] == livingCell) {
        numLiveNeighbours++;
      }

      // Top right
      if (originalWorldBytes[i - rightEdgeDelta + 1 - width + topEdgeDelta] == livingCell) {
        numLiveNeighbours++;
      }

      // The one to the right of it
      if (originalWorldBytes[i - rightEdgeDelta + 1] == livingCell) {
        numLiveNeighbours++;
      }

      // Top left
      if (originalWorldBytes[i - (width + 1) + topEdgeDelta + leftEdgeDelta] == livingCell) {
        numLiveNeighbours++;
      }

      // The one to the left of it
      if (originalWorldBytes[i - 1 + leftEdgeDelta] == livingCell) {
        numLiveNeighbours++;
      }

      // Bottom left
      if (originalWorldBytes[i + width - bottomEdgeDelta - 1 + leftEdgeDelta] == livingCell) {
        numLiveNeighbours++;
      }

      // Bottom
      if (originalWorldBytes[i + width - bottomEdgeDelta] == livingCell) {
        numLiveNeighbours++;
      }

      // Bottom right
      if (originalWorldBytes[i + width - bottomEdgeDelta + 1 - rightEdgeDelta] == livingCell) {
        numLiveNeighbours++;
      }

      if (originalWorldBytes[i] == livingCell) {
        if (numLiveNeighbours == 2 || numLiveNeighbours == 3) {
          resultWorldBytes[i] = 'O';
        } else {
          resultWorldBytes[i] = '.';
        }
      } else {
        if (numLiveNeighbours == 3) {
          resultWorldBytes[i] = 'O';
        } else {
          resultWorldBytes[i] = '.';
        }
      }
    }
    return string(resultWorldBytes);
  }
}
