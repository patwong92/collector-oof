const cardset = require('./cardset');

const querybuilder = (cardname, expansion, style) => {

  let exp_code = cardset.find(item => item.code === expansion).queryname;

  const regex = /\s/g;
  let query = cardname;

  if (style === 'Showcase' || style === 'Borderless')
  {
    query = query.concat('-' + style);

    if (cardname === 'Teferi, Master of Time' && style == 'Showcase') {
      query = query.concat('-290'); //Use 290 as one of 4 card editions of this type
    }
  } else if (style === 'Alternate') {
    query = query.concat('-' + style + '-art')

    if (cardname === 'Teferi, Master of Time') {
      query = query.concat('-275') //Use 275 as one of 4 card editions of this type
    }
  }

  query = query.concat('-' + exp_code).replace(regex, '-').replace(',', '').toLowerCase()

  return query
}

module.exports = querybuilder;