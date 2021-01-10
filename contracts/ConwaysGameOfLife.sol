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

    // Maximum for this is 8, so 8 bits is more than enough
    uint8 numLiveNeighbours = 0;

    for(uint i=0;i<worldLength;i++) {
      numLiveNeighbours = 0;

      // This is a top-edge cell
      if (i < width) {
        topEdgeDelta = worldLength;
      } else {
        topEdgeDelta = 0;
      }

      // This is right-edge cell
      if ((i + 1) % width == 0) {
        rightEdgeDelta = width;
      } else {
        rightEdgeDelta = 0;
      }

      // This is a bottom-edge cell
      if (i + width > worldLength - 1) {
        bottomEdgeDelta = worldLength;
      } else {
        bottomEdgeDelta = 0;
      }

      // This is a left-edge cell
      if ((i + width) % width == 0) {
        leftEdgeDelta = width;
      } else {
        leftEdgeDelta = 0;
      }

      // Top left
      if (originalWorldBytes[i - (width + 1) + topEdgeDelta + leftEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      // Top
      if (originalWorldBytes[i - width + topEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      // Top right
      if (originalWorldBytes[i + 1 - width + topEdgeDelta - rightEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      // The one to the left of it
      if (originalWorldBytes[i - 1 + leftEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      // The one to the right of it
      if (originalWorldBytes[i + 1 - rightEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      // Bottom left
      if (originalWorldBytes[i + width - 1 - bottomEdgeDelta + leftEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      // Bottom
      if (originalWorldBytes[i + width - bottomEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      // Bottom right
      if (originalWorldBytes[i + width + 1 - bottomEdgeDelta - rightEdgeDelta] == byte('O')) {
        numLiveNeighbours++;
      }

      if (originalWorldBytes[i] == byte('O')) {
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
