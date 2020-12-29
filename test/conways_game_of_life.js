const ConwaysGameOfLife = artifacts.require("ConwaysGameOfLife");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ConwaysGameOfLife", (accounts) => {
  let instance;

  before(async () => {
    instance = await ConwaysGameOfLife.deployed();
  });

  describe('#getWorld', () => {
    it("should return the default world", async function () {
      let board = await instance.getWorld({ from: accounts[0] });
      const defaultBoard = '.O.....O..OOO............';
      return assert.equal(board, defaultBoard);
    });
  });

  describe('#getWorld', () => {
    it("should return the default world width", async function () {
      let width = await instance.getWidth({ from: accounts[0] });
      return assert.equal(width, 5);
    });
  });

  describe('#setWorld', () => {
    it('should set the world to the specified configuration', async () => {
      const boardString = '.OOO.....................';
      await instance.setWorld(boardString, { from: accounts[0] });
      let board = await instance.getWorld({ from: accounts[0] });
      return assert.equal(board, boardString);
    });

    describe('when ethereum is recieved', () => {
      describe('when exactly the right amount is sent (0.0001 ETH)', () => {
        describe('a world where a live cell has exactly two living neighbours', () => {
          let world;
          before(async () => {
            let boardString = '';
            boardString += '.....'
            boardString += '.OO..'
            boardString += '.O...'
            boardString += '.....'
            boardString += '.....';
            await instance.setWorld(boardString, { from: accounts[0] });
            let board = await instance.getWorld({ from: accounts[0] });
            assert.equal(board, boardString);
            await instance.send(1000000000000000, { from: accounts[0] });
            const worldString = await instance.getWorld({ from: accounts[0] });
            world = worldString.match(/.{1,5}/g)
          });

          it('should kill the living adjacent cells', async () => {
            expect(world[1][1]).equal('.');
            expect(world[1][2]).equal('.');
            expect(world[2][1]).equal('.');
          });
      
          // it("should bring to life the dead adjacent cells", function() {
          //   expect(gameOfLife.get_world()[2][0]).toEqual(true);
          //   expect(gameOfLife.get_world()[2][2]).toEqual(true);
          // });

          // it("should not revive any other cells", function() {
          //   expect(gameOfLife.get_world()[0][0]).toBeFalsy();
          //   expect(gameOfLife.get_world()[1][0]).toBeFalsy();
          //   expect(gameOfLife.get_world()[3][0]).toBeFalsy();
      
          //   expect(gameOfLife.get_world()[0][3]).toBeFalsy();
          //   expect(gameOfLife.get_world()[1][3]).toBeFalsy();
          //   expect(gameOfLife.get_world()[2][3]).toBeFalsy();
          //   expect(gameOfLife.get_world()[3][3]).toBeFalsy();
          // });
        });
      });

      describe('when too little is sent (0.00005 ETH)', () => {
        // Send it back
      });

      describe('when too much is sent (0.00011 ETH)', () => {
        // Send it back
      });
    });
  });
});