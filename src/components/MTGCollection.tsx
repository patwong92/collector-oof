import React from 'react';

type Rarity = 'M' | 'R' | 'U' | 'C'
type Style = 'Regular' | 'Extended' | 'Showcase' | 'Alternate'

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
    name: 'Teferi',
    image: 'https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=489167',
    num: 277,
    expansion: 'M21',
    rarity: 'M' as const,
    style: 'Showcase' as const,
    foil: true,
    price: 69.99
  }
]

const isFoil = (condition: boolean): string => {
  if (condition)
    return "Foil"
  return "Regular"
}

export const MTGCollection: React.FC<{}> = () => {
  return (
    <div>
      ${data.map(e => {
        return (
          <div>
              {e.name}, {e.num}, {e.expansion}, {e.rarity}, {isFoil(e.foil)} {e.price}
          </div>
        )
      })}
    </div>
  )
}
