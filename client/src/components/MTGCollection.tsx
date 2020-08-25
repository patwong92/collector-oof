import React, {useState, useEffect} from 'react';
import './styles/MTGCollection.scss';
import { Table } from 'react-bootstrap';
import { DateNow } from './DateNow';

type Card = {
  name: string
  expansion: string
  style: string
  foil: boolean
  price: string
  estvalue: string
}

const isFoil = (condition: boolean): string => {
  return condition? "Foil" : "Non-Foil";
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
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await fetch('/api/check/all').then(res => res.json());
      setData(result);
      setTotalPrice(TotalValue(result));
      setIsLoading(false)
    }
    fetchData();

    let someDate: Date = new Date(Date.now())
    setDate(someDate.toString());
  }, [])

  if (isLoading)
  {
    return <>Loading table data...</>
  }

  return (
    <div>
      <h1 className='page-title'>Total Collection Value (CAD): {totalPrice} as of <DateNow date={date}/></h1>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Expansion</th>
            <th>Artwork</th>
            <th>Foil/Non-Foil</th>
            <th>Facetofacegames Price</th>
            <th>Estimated Resale Value (80% F2F)</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </Table>
    </div>
  )
}
