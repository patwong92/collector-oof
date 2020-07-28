
const querybuilder = (expansion, cardname, foil, artstyle) => {
  //Query string will be formatted as: expansion + cardname + foil (optional) + art (optional)
//Example: Ugin%2C+the+Spirit+Dragon

let query = expansion.concat('+').concat(cardname)
const regex = /\s/g;
query = query.replace(regex, '+').replace(',', '%2C');

if (foil === true) {
  query = query.concat('+-+Foil');
}

if (artstyle !== 'Regular') {
  query = query.concat('+-+').concat(artstyle)
}

return query;
}

module.exports = querybuilder;