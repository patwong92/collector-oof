
import { queryBuilder } from '../MTGCollection'

describe('[DOM] Karn, Scion of Urza', () => {
  let card = {
    name: 'Karn, Scion of Urza',
    image: 'not important',
    num: 1,
    expansion: 'DOM',
    rarity: 'M' as any,
    style: 'Regular'as any,
    foil: false,
    price: 10.99
  }

  it ('should pass for regular, non-foil', () => {
    let result = queryBuilder(card);
    expect(result).toBe('DOM+Karn%2C+Scion+of+Urza');
  })

  it ('should pass for Ravnica Masterpiece, foil', () => {
    card.expansion = 'RA1';
    card.foil = true;
    let result = queryBuilder(card);
    expect(result).toBe('RA1+Karn%2C+Scion+of+Urza+-+Foil');
  })

})

describe('[M21] Liliana, Waker of the Dead', () => {
  let card = {
    name: 'Liliana, Waker of the Dead',
    image: 'not important',
    num: 1,
    expansion: 'M21',
    rarity: 'M' as any,
    style: 'Regular'as any,
    foil: false,
    price: 10.99
  }

  it ('should pass for regular, non-foil', () => {
    let result = queryBuilder(card);
    expect(result).toBe('M21+Liliana%2C+Waker+of+the+Dead');
  })

  it ('should pass for regular, foil', () => {
    card.foil = true;
    let result = queryBuilder(card);
    expect(result).toBe('M21+Liliana%2C+Waker+of+the+Dead+-+Foil');
  })

  it ('should pass for showcase, foil', () => {
    card.style = 'Showcase';
    let result = queryBuilder(card);
    expect(result).toBe('M21+Liliana%2C+Waker+of+the+Dead+-+Foil+-+Showcase');
  })
})

