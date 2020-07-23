const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const cheerio = require('cheerio');

const re = /\d+\.\d\d/g;

const fmtPrice = (str) => {
  return str.match(re)[0];
}

router.get('/:name', async(req, res) => {
  const processData = async (card_name) => {
    const data = await fetch(`https://www.facetofacegames.com/products/search?q=${card_name}`);
    const responseData = await data.text();

    let $ = cheerio.load(responseData);
    let rawdata = $('.inner').slice(1).eq(0);
    let instock = rawdata.find('.product-price').length;

    if (instock == 1) {
      res.send(fmtPrice(rawdata.find('.product-price').text().trim()));
    } else if (instock == 0) {
      res.send(fmtPrice(rawdata.find('.no-stock').find('.price').text().trim()));
    } else {
      res.send('0');
    }
  }

  processData(req.params.name);
  res.end;
});

module.exports = router;