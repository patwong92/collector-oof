const express = require('express');
const router = express.Router();
const data = require('../db/data')

router.get('/', (req, res) => {
  res.json(data)
})

router.get('/gg', async (req, res) => {
  const jj = await res.redirect('/api/check/Baneslayer+Angel');
  const pp = await res.redirect('/api/check/Karn%2C+Scion+of+Urza');
})

router.get('/:id', (req, res) => {
  const check = item => item.id === parseInt(req.params.id)

  const found = data.some(check)

  if (found) {
    res.json(data.filter(check))
  } else {
    res.status(400).json({msg: `Card with id of ${req.params.id} not found`})
  }
  
})



module.exports = router;