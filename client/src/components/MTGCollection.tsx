import React, {useState, useEffect} from 'react';
import './styles/MTGCollection.scss'

type Card = {
  name: string
  expansion: string
  style: string
  foil: boolean
  price: string
  estvalue: string
}

const isFoil = (condition: boolean): string => {
  return condition? "Foil" : "Regular";
}

const TotalValue = (collection: Card[]): string => {
  let sum: number = 0;
  collection.map(item => sum += parseFloat(item.estvalue));

  let rounded_value = Math.round( ( sum + Number.EPSILON ) * 100 ) / 100
  return rounded_value.toFixed(2);
}

export const MTGCollection: React.FC<{}> = () => {
  const [totalPrice, setTotalPrice] = useState("");
  const [data, setData] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('/api/check/all').then(res => res.json());
      setData(result);
      setTotalPrice(TotalValue(result));
    }
    fetchData();
  }, [])

  return (
    <div className='collection'>
      <h1>My Collection</h1>
      <h2>Total Collection Value: {totalPrice}</h2>
      <table className='table'>
        <tr>
          <th>Card Name</th>
          <th>Expansion</th>
          <th>Artwork</th>
          <th>Foil/Non-Foil</th>
          <th>Facetofacegames Price</th>
          <th>Estimated Resale Value (80% F2F)</th>
        </tr>
        {data.map(e => {
          return (
            <tr>
              <td>{e.name}</td>
              <td>{e.expansion}</td>
              <td>{e.style}</td>
              <td>{isFoil(e.foil)}</td>
              <td>{e.price}</td>
              <td>{e.estvalue}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
