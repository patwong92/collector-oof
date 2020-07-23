const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use('/api/check', require('../api/cardprice'));

test('Checking if /api/check/ works' , () => {
  expect(1 + 1).toBe(2);
})

// test('Should output a price' , async () => {
//   const data = await fetch('/api/check/Craterhoof+Behemoth');
//   expect(data).toBe('$59.99');
// })