const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/check', require('./api/cardprice'));
app.use('/api/cards', require('./api/cards'));
app.use(express.static(path.join(__dirname, './client/build')))

app.get('/', (req, res) => {
  res.send('Hello world!');
})

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app;