const express = require('express');
const router = express.Router();
const querybuilder = require('../helper/querybuilder');
const resalevalue = require('../helper/resalevalue');
const puppeteer = require('puppeteer');

router.get('/all', async(req, res) => {

  const processData = async (card_name, expansion, foil, style) => {
    
    let obj = {
      name: card_name,
      expansion: expansion,
      foil: foil,
      style: style
    }

    const query = querybuilder(card_name, expansion);
    let URL = `https://www.facetofacegames.com/${query}/`;

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(URL, {waitUntil: 'networkidle2'});
  
    await Promise.all([
      foil? page.evaluate(() => document.querySelector("input[data-label='Foil']").click()):
      page.evaluate(() => document.querySelector("input[data-label='Non-Foil']").click()),
      page.waitFor(1000)
    ])
  
    let data = await page.evaluate(() => {
      let price = document.querySelector('.price--withoutTax').innerText
      return price;  
    });

    obj['price'] = await data.substring(1);
    obj['estvalue'] = resalevalue(parseFloat(data.substring(1)));

    return obj;
  }

  const collection = require('../db/data');

  async function processAllData(item) {
    return await processData(item.name, item.expansion, item.foil, item.style);
  }

  const list = await Promise.all(collection.map(processAllData))
  res.send(list)
  // console.log(list);
})

module.exports = router;