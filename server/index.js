const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/check', require('./api/cardprice'));

app.get('/logic', (req, res) => {
  res.send({name: 'logic'});
})

app.get('/', (req, res) => {
  res.send('Hello world!');
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app;