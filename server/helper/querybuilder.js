const cardset = require('./cardset');

const querybuilder = (cardname, expansion) => {

  let exp_code = cardset.find(item => item.code === expansion).queryname

  const regex = /\s/g;
  let query = cardname.concat('-' + exp_code).replace(regex, '-').replace(',', '').toLowerCase()

  return query
}

module.exports = querybuilder;