// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract ConwaysGameOfLife {
  string world = '.O.....O..OOO............';

  receive() external payable {
    // Greater than or equal to 0.00001
    // below this is just for gas
    if (msg.value >= 10000000000000) {
      bytes memory originalWorldBytes = bytes(world);
      bytes memory resultWorldBytes = new bytes(originalWorldBytes.length);
      uint topEdgeDelta = 0;
      uint rightEdgeDelta = 0;
      uint bottomEdgeDelta = 0;
      uint leftEdgeDelta = 0;
      uint numLiveNeighbours = 0;

      for(uint i=0;i<25;i++) {
        numLiveNeighbours = 0;
        topEdgeDelta = 0;
        rightEdgeDelta = 0;
        bottomEdgeDelta = 0;
        leftEdgeDelta = 0;

        // This is a top-edge cell
        if (i < 5) {
          topEdgeDelta = 25;
        }

        // This is right-edge cell
        if ((i + 1) % 5 == 0) {
          rightEdgeDelta = 5;
        }

        // This is a bottom-edge cell
        if (i + 5 > 25 - 1) {
          bottomEdgeDelta = 25;
        }

        // This is a left-edge cell
        if ((i + 5) % 5 == 0) {
          leftEdgeDelta = 5;
        }

        // Top
        if (originalWorldBytes[i - 5 + topEdgeDelta] == 'O') {
          numLiveNeighbours++;
        }

        // Top right
        if (originalWorldBytes[i - rightEdgeDelta + 1 - 5 + topEdgeDelta] == 'O') {
          numLiveNeighbours++;
        }

        // The one to the right of it
        if (originalWorldBytes[i - rightEdgeDelta + 1] == 'O') {
          numLiveNeighbours++;
        }

        // Top left
        if (originalWorldBytes[i - (5 + 1) + topEdgeDelta + leftEdgeDelta] == 'O') {
          numLiveNeighbours++;
        }

        // The one to the left of it
        if (originalWorldBytes[i - 1 + leftEdgeDelta] == 'O') {
          numLiveNeighbours++;
        }

        // Bottom left
        if (originalWorldBytes[i + 5 - bottomEdgeDelta - 1 + leftEdgeDelta] == 'O') {
          numLiveNeighbours++;
        }

        // Bottom
        if (originalWorldBytes[i + 5 - bottomEdgeDelta] == 'O') {
          numLiveNeighbours++;
        }

        // Bottom right
        if (originalWorldBytes[i + 5 - bottomEdgeDelta + 1 - rightEdgeDelta] == 'O') {
          numLiveNeighbours++;
        }

        if (originalWorldBytes[i] == 'O') {
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
      // return string(resultWorldBytes);
      world = string(resultWorldBytes);
      // For now this is a test address. I will have it go to EFF for real.
      payable(address(0x860c8513dE758223C59D7dFc544298b4Bf059288)).transfer(msg.value);
    }
  }

  fallback() external payable {  }

  function getWorld() public view returns(string memory) {
    return world;
  }

  // Uncomment when running tests
  // function setWorld(string memory newWorld) public {
  //   world = newWorld;
  // }

  // function nextBoard() private view returns(string memory) {
  //   bytes memory originalWorldBytes = bytes(world);
  //   bytes memory resultWorldBytes = new bytes(originalWorldBytes.length);
  //   uint topEdgeDelta = 0;
  //   uint rightEdgeDelta = 0;
  //   uint bottomEdgeDelta = 0;
  //   uint leftEdgeDelta = 0;
  //   uint numLiveNeighbours = 0;

  //   byte livingCell = byte('O');

  //   // Maximum for this is 8, so 8 bits is more than enough

  //   for(uint i=0;i<25;i++) {
  //     numLiveNeighbours = 0;
  //     topEdgeDelta = 0;
  //     rightEdgeDelta = 0;
  //     bottomEdgeDelta = 0;
  //     leftEdgeDelta = 0;

  //     // This is a top-edge cell
  //     if (i < 5) {
  //       topEdgeDelta = 25;
  //     }

  //     // This is right-edge cell
  //     if ((i + 1) % 5 == 0) {
  //       rightEdgeDelta = 5;
  //     }

  //     // This is a bottom-edge cell
  //     if (i + 5 > 25 - 1) {
  //       bottomEdgeDelta = 25;
  //     }

  //     // This is a left-edge cell
  //     if ((i + 5) % 5 == 0) {
  //       leftEdgeDelta = 5;
  //     }

  //     // Top
  //     if (originalWorldBytes[i - 5 + topEdgeDelta] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     // Top right
  //     if (originalWorldBytes[i - rightEdgeDelta + 1 - 5 + topEdgeDelta] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     // The one to the right of it
  //     if (originalWorldBytes[i - rightEdgeDelta + 1] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     // Top left
  //     if (originalWorldBytes[i - (5 + 1) + topEdgeDelta + leftEdgeDelta] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     // The one to the left of it
  //     if (originalWorldBytes[i - 1 + leftEdgeDelta] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     // Bottom left
  //     if (originalWorldBytes[i + 5 - bottomEdgeDelta - 1 + leftEdgeDelta] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     // Bottom
  //     if (originalWorldBytes[i + 5 - bottomEdgeDelta] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     // Bottom right
  //     if (originalWorldBytes[i + 5 - bottomEdgeDelta + 1 - rightEdgeDelta] == livingCell) {
  //       numLiveNeighbours++;
  //     }

  //     if (originalWorldBytes[i] == livingCell) {
  //       if (numLiveNeighbours == 2 || numLiveNeighbours == 3) {
  //         resultWorldBytes[i] = 'O';
  //       } else {
  //         resultWorldBytes[i] = '.';
  //       }
  //     } else {
  //       if (numLiveNeighbours == 3) {
  //         resultWorldBytes[i] = 'O';
  //       } else {
  //         resultWorldBytes[i] = '.';
  //       }
  //     }
  //   }
  //   return string(resultWorldBytes);
  // }
}
