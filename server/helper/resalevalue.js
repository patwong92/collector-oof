const resalevalue = (retail_price) => {
  let percentage = 0.80;
  let result = percentage*retail_price;
  let rounded_value = Math.round( ( result + Number.EPSILON ) * 100 ) / 100

  return rounded_value.toFixed(2);
}

module.exports = resalevalue;