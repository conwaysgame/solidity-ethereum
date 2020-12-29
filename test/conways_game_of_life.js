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
        describe('a world where a live cell has exactly zero living neighbours', () => {
          let world;
          before(async () => {
            let boardString = '';
            boardString += '.....'
            boardString += '.O...'
            boardString += '.....'
            boardString += '.....'
            boardString += '.....';
            await instance.setWorld(boardString, { from: accounts[0] });
            let board = await instance.getWorld({ from: accounts[0] });
            assert.equal(board, boardString);
            await instance.send(1000000000000000, { from: accounts[0] });
            const worldString = await instance.getWorld({ from: accounts[0] });
            world = worldString.match(/.{1,5}/g)
          });

          it('should kill the living cell', async () => {
            expect(world[1][1]).equal('.');
          });
        });

        describe('a world where a dead cell has exactly three living neighbours', () => {
          let world;
          before(async () => {
            let boardString = '';
            boardString += '.....'
            boardString += '...O.'
            boardString += '.....'
            boardString += '.O.O.'
            boardString += '.....';
            await instance.setWorld(boardString, { from: accounts[0] });
            let board = await instance.getWorld({ from: accounts[0] });
            assert.equal(board, boardString);
            await instance.send(1000000000000000, { from: accounts[0] });
            const worldString = await instance.getWorld({ from: accounts[0] });
            world = worldString.match(/.{1,5}/g)
          });

          it('should bring the dead cell to life', async () => {
            expect(world[2][2]).equal('O');
          });
        });

        describe('a world where a living cell has exactly four living neighbours', () => {
          let world;
          before(async () => {
            let boardString = '';
            boardString += '.....'
            boardString += '.O.O.'
            boardString += '..O..'
            boardString += '.O.O.'
            boardString += '.....';
            await instance.setWorld(boardString, { from: accounts[0] });
            let board = await instance.getWorld({ from: accounts[0] });
            assert.equal(board, boardString);
            await instance.send(1000000000000000, { from: accounts[0] });
            const worldString = await instance.getWorld({ from: accounts[0] });
            world = worldString.match(/.{1,5}/g)
          });

          it('should kill the living cell as if by overpopulation', async () => {
            expect(world[2][2]).equal('.');
          });
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
