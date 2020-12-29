const ConwaysGameOfLife = artifacts.require("ConwaysGameOfLife");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ConwaysGameOfLife", function (accounts) {
  let instance;

  before(async () => {
    instance = await ConwaysGameOfLife.deployed();
  });

  it("should return the default board", async function () {
    let board = await instance.getBoard({ from: accounts[0] })
    const defaultBoard = '.O...\n..O..\nOOO..\n.....\n.....';
    return assert.equal(board, defaultBoard);
  });

  describe('#setBoard', () => {
    it('should set the board to the specified configuration', async () => {
      const boardString = '.OOO.\n.....\n.....\n.....\n.....';
      await instance.setBoard(boardString, { from: accounts[0] });
      let board = await instance.getBoard({ from: accounts[0] });
      return assert.equal(board, boardString);
    });

    // describe('when ethereum is recieved', () => {
    //   describe('when exactly the right amount is sent (0.0001 ETH)', () => {
    //     describe('a world where a live cell has exactly two living neighbours', () => {
    //       before(async () => {
    //         const boardString = '.....\n.OOO.\n.....\n.....\n.....';
    //         await instance.setBoard(boardString, { from: accounts[0] });
    //         let board = await instance.getBoard({ from: accounts[0] });
    //         return assert.equal(board, boardString);
    //         await instance.send(1000000000000000, { from: accounts[0] });
    //       })
    //       it("should kill the living peripheral cells", function() {
    //         expect(gameOfLife.get_world()[1][1]).toEqual(false);
    //         expect(gameOfLife.get_world()[2][1]).toEqual(true);
    //         expect(gameOfLife.get_world()[3][1]).toEqual(false);
    //       });
      
    //       it("should bring to life the dead peripheral cells", function() {
    //         expect(gameOfLife.get_world()[2][0]).toEqual(true);
    //         expect(gameOfLife.get_world()[2][2]).toEqual(true);
    //       });

    //       it("should not revive any other cells", function() {
    //         expect(gameOfLife.get_world()[0][0]).toBeFalsy();
    //         expect(gameOfLife.get_world()[1][0]).toBeFalsy();
    //         expect(gameOfLife.get_world()[3][0]).toBeFalsy();
      
    //         expect(gameOfLife.get_world()[0][3]).toBeFalsy();
    //         expect(gameOfLife.get_world()[1][3]).toBeFalsy();
    //         expect(gameOfLife.get_world()[2][3]).toBeFalsy();
    //         expect(gameOfLife.get_world()[3][3]).toBeFalsy();
    //       });
    //     });
    //   });

    //   describe('when too little is sent (0.00005 ETH)', () => {
    //     // Send it back
    //   });

    //   describe('when too much is sent (0.00011 ETH)', () => {
    //     // Send it back
    //   });
    // });
  });
});
