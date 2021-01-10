const ConwaysGameOfLife = artifacts.require("ConwaysGameOfLife");

/*
 * You will need to uncomment `setWorld` in `ConwaysGameOfLife.sol` if you wish
 * to test this smart contract.
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

        describe('a world where a living cell has exactly four living neighbours on another side of', () => {
          let world;
          before(async () => {
            let boardString = '';
            boardString += '.....'
            boardString += 'O..O.'
            boardString += '....O'
            boardString += 'O..O.'
            boardString += '.....';
            await instance.setWorld(boardString, { from: accounts[0] });
            let board = await instance.getWorld({ from: accounts[0] });
            assert.equal(board, boardString);
            await instance.send(1000000000000000, { from: accounts[0] });
            const worldString = await instance.getWorld({ from: accounts[0] });
            world = worldString.match(/.{1,5}/g)
          });

          it('should kill the living cell as if by overpopulation', async () => {
            expect(world[2][4]).equal('.');
          });
        });

        describe('a world where a there is a glider', () => {
          let worldString;

          it('should glide', async () => {
            let boardString = '';
            boardString += '.O...'
            boardString += '..O..'
            boardString += 'OOO..'
            boardString += '.....'
            boardString += '.....';
            let firstStep = '';
            firstStep += '.....'
            firstStep += 'O.O..'
            firstStep += '.OO..'
            firstStep += '.O...'
            firstStep += '.....';
            let secondStep = '';
            secondStep += '.....'
            secondStep += '..O..'
            secondStep += 'O.O..'
            secondStep += '.OO..'
            secondStep += '.....';
            let thirdStep = '';
            thirdStep += '.....'
            thirdStep += '.O...'
            thirdStep += '..OO.'
            thirdStep += '.OO..'
            thirdStep += '.....';
            let fourthStep = '';
            fourthStep += '.....'
            fourthStep += '..O..'
            fourthStep += '...O.'
            fourthStep += '.OOO.'
            fourthStep += '.....';

            await instance.setWorld(boardString, { from: accounts[0] });
            let board = await instance.getWorld({ from: accounts[0] });
            assert.equal(board, boardString);

            await instance.send(1000000000000000, { from: accounts[0] });
            worldString = await instance.getWorld({ from: accounts[0] });
            assert.equal(worldString, firstStep);

            await instance.send(1000000000000000, { from: accounts[0] });
            worldString = await instance.getWorld({ from: accounts[0] });
            assert.equal(worldString, secondStep);

            await instance.send(1000000000000000, { from: accounts[0] });
            worldString = await instance.getWorld({ from: accounts[0] });
            assert.equal(worldString, thirdStep);

            await instance.send(1000000000000000, { from: accounts[0] });
            worldString = await instance.getWorld({ from: accounts[0] });
            assert.equal(worldString, fourthStep);
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
