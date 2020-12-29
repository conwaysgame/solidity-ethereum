// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract ConwaysGameOfLife {
  string board;

  constructor() {
    board = '.O...\n..O..\nOOO..\n.....\n.....';
  }

  function getBoard() public view returns(string memory) {
    return board;
  }

  function setBoard(string memory newBoard) public returns(bool success) {
    board = newBoard;
    return true;
  }
}
