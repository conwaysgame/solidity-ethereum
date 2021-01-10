const ghpages = require('gh-pages');
const fs = require('fs');

fs.copyFileSync('build/contracts/ConwaysGameOfLife.json', 'client/ConwaysGameOfLife.json');

ghpages.publish('client', {
  remove: "client/ConwaysGameOfLife.json"
}, function(err) {
  console.log('Deleting JSON file from client')
  fs.unlinkSync('client/ConwaysGameOfLife.json', { force: true });
});