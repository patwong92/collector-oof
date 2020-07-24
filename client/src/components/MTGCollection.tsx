import React from 'react';
import './styles/MTGCollection.scss'
import {CardPrice} from './CardPrice';

type Rarity = 'M' | 'R' | 'U' | 'C'
type Style = 'Regular' | 'Extended Art' | 'Showcase' | 'Alternate Alt' | 'Borderless'

type Card = Readonly<{
  name: string
  image: string
  num: number
  expansion: string
  rarity: Rarity
  style: Style
  foil: boolean
  price: number
}>

const data: Card[] = [
  {
    name: 'Ugin, the Spirit Dragon',
    image: 'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=485324&type=card',
    num: 1,
    expansion: 'M21',
    rarity: 'M' as const,
    style: 'Showcase' as const,
    foil: true,
    price: 109.99
  },
  {
    name: 'Teferi, Master of Time',
    image: 'https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=489167',
    num: 277,
    expansion: 'M21',
    rarity: 'M' as const,
    style: 'Showcase' as const,
    foil: true,
    price: 69.99
  },
  {
    name: 'Baneslayer Angel',
    image: 'https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=485329',
    num: 6,
    expansion: 'M21',
    rarity: 'M' as const,
    style: 'Regular' as const,
    foil: true,
    price: 5.99
  }
]

const isFoil = (condition: boolean): string => {
  return condition? "Foil" : "Regular";
}

const ResaleValue = (retail_price: number): number => {
  let percentage: number = 0.80;
  return percentage*retail_price;
}

const TotalValue = (collection: Card[]): number => {
  let sum: number = 0;
  collection.map(e => sum += ResaleValue(e.price))
  return sum;
}

export const queryBuilder = (card: Card) => {
  //Ugin%2C+the+Spirit+Dragon
  //expansion + cardname + foil (optional) + art (optional)
  let query = card.expansion.concat('+').concat(card.name)
  const regex = /\s/g;
  query = query.replace(regex, '+').replace(',', '%2C');
  
  if (card.foil == true) {
    query = query.concat('+-+Foil');
  }
  
  if (card.style !== 'Regular') {
    query = query.concat('+-+').concat(card.style)
  }

  return query;
}

export const MTGCollection: React.FC<{}> = () => {
  return (
    <div className='collection'>
      <h1>My Collection</h1>
      <h2>Total Collection Value: {TotalValue(data).toFixed(2)}</h2>
      {data.map(e => {
        return (
          <table>
              <tr>
                <td><img alt={e.name} src={e.image} /></td>
                <td>
                  <ul className='card-info'>
                    <li><h1>{e.name}</h1></li>
                    <li>{e.expansion}, {e.rarity}, {e.style}, {isFoil(e.foil)}</li>
                    <li>F2F Price: {e.price}</li>
                    <li>80% F2F: ${ResaleValue(e.price).toFixed(2)}</li>
                  </ul>
                </td>
              </tr>
          </table>
        )
      })}
      <CardPrice cardname='teferi%2C+hero+of+dominaria' />
      <CardPrice cardname='Ugin%2C+the+Spirit+Dragon' />
      <CardPrice cardname='Liliana+of+the+Veil'/>
    </div>
  )
}
