const querybuilder = require('../helper/querybuilder');

describe ('Card with comma', () => {
  test('Teferi, Time Reveler', () => {
    expect(querybuilder('Teferi, Time Raveler', 'WAR', 'Regular')).toBe('teferi-time-raveler-war-of-the-spark');
  })
})

describe ('Card with hyphen', () => {
  test('Krark-Clan Ironworks', () => {
    expect(querybuilder('Krark-Clan Ironworks', '5DN', 'Regular')).toBe('krark-clan-ironworks-5dn')
  })
})

describe ('Showcase card', () => {
  test('Ugin, the Spirit Dragon', () => {
    expect(querybuilder('Ugin, the Spirit Dragon', 'M21', 'Showcase')).toBe('ugin-the-spirit-dragon-showcase-core-set-2021')
  })  
})

describe ('Card with multiple alternate and showcase versions', () => {
  test('Teferi, Master of Time Showcase', () => {
    expect(querybuilder('Teferi, Master of Time', 'M21', 'Showcase')).toBe('teferi-master-of-time-showcase-290-core-set-2021')
  })
  
  test('Teferi, Master of Time Alternate Art', () => {
    expect(querybuilder('Teferi, Master of Time', 'M21', 'Alternate')).toBe('teferi-master-of-time-alternate-art-275-core-set-2021')
  })
})

describe ('Borderless card', () => {
  test('Chandra, Heart of Fire', () => {
    expect(querybuilder('Chandra, Heart of Fire', 'M21', 'Borderless')).toBe('chandra-heart-of-fire-borderless-core-set-2021')
  })
  
  test('Teferi, Master of Time', () => {
    expect(querybuilder('Teferi, Master of Time', 'M21', 'Borderless')).toBe('teferi-master-of-time-borderless-core-set-2021')
  })
})


