require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.static('client'));
app.use(express.static('build/contracts'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

app.get('*', (req, res) => {
  res.status(404);
  res.send('This URL does not exist');
});

app.listen(PORT, () => {
  console.log(`Decentralised Conway's Game of Life running on Port ${PORT}...`);
});