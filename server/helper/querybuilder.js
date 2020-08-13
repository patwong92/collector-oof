const querybuilder = (cardname, expansion) => {

  const dict = [
    {
      code: 'DOM',
      queryname: 'dom'
    },
    {
      code: 'M21',
      queryname: 'core-set-2021'
    },
    {
      code: '2XM',
      queryname: 'double-masters'
    },
    {
      code: 'RNA',
      queryname: 'ravnica-allegiance'
    }
  ]

  let exp_code = dict.find(item => item.code === expansion).queryname

  const regex = /\s/g;
  let query = cardname.concat('-' + exp_code).replace(regex, '-').replace(',', '').toLowerCase()

  return query
}

module.exports = querybuilder;