const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const cheerio = require('cheerio');
const querybuilder = require('../helper/querybuilder');
const resalevalue = require('../helper/resalevalue');

const re = /\d+\.\d\d/g;

const fmtPrice = (str) => {
  return str.match(re)[0];
}

router.get('/all', async(req, res) => {

  const processData = async (expansion, card_name, foil, style) => {
    const query = querybuilder(expansion, card_name, foil, style);

    const data = await fetch(`https://www.facetofacegames.com/products/search?q=${query}`);
    const responseData = await data.text();

    let $ = cheerio.load(responseData);
    let rawdata = $('.inner').slice(1).eq(0);

    if (rawdata.find('h4').text().includes('Foil') && (foil !== true))
      rawdata = $('.inner').slice(1).eq(1)

    let instock = rawdata.find('.product-price').length;

    let obj = {
      name: card_name,
      expansion: expansion,
      foil: foil,
      style: style,
    }

    if (instock == 1) {
      obj['price'] = fmtPrice(rawdata.find('.product-price').text().trim());
    } else if (instock == 0) {
      obj['price'] = fmtPrice(rawdata.find('.no-stock').find('.price').text().trim());
    } else {
      obj['price'] = '0';
    }

    obj['estvalue'] = resalevalue(parseFloat(obj.price))

    return obj;
  }

  const collection = require('../db/data');

  async function processAllData(item) {
    return await processData(item.expansion, item.name, item.foil, item.style);
  }

  const list = await Promise.all(collection.map(processAllData))
  res.send(list)
})

router.get('/this', async(req, res) => {

  const processData = async (expansion, card_name, foil, style) => {
    const query = querybuilder(expansion, card_name, foil, style);

    const data = await fetch(`https://www.facetofacegames.com/products/search?q=${query}`);
    const responseData = await data.text();

    let $ = cheerio.load(responseData);
    let rawdata = $('.inner').slice(1).eq(1).find('h4').text();

    res.send(rawdata)

    // if (rawdata.includes('Foil') && (foil === true))
    // {
    //   res.send("Success!")
    // } else {
    //   res.send("Fail")
    // }

  //   let instock = rawdata.find('.product-price').length;

  //   let obj = {
  //     name: card_name,
  //     expansion: expansion,
  //     foil: foil,
  //     style: style,
  //   }

  //   if (instock == 1) {
  //     obj['price'] = fmtPrice(rawdata.find('.product-price').text().trim());
  //   } else if (instock == 0) {
  //     obj['price'] = fmtPrice(rawdata.find('.no-stock').find('.price').text().trim());
  //   } else {
  //     obj['price'] = '0';
  //   }

  //   obj['estvalue'] = resalevalue(parseFloat(obj.price))

  //   return obj;
  }

  processData('ISD', 'Parallel Lives', false, 'Regular');

});



module.exports = router;