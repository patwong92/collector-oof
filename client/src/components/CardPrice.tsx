import React, {useState, useEffect} from 'react';

type CardQuery = {
  cardname: string;
  expansion?: string;
  style?: string;
  foil?: string
}

export const CardPrice: React.FC<CardQuery> = ({ cardname }) => {
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`/api/check/${cardname}`).then(res => res.json());
      setPrice(result.price);
      setIsLoading(false);
    }

    fetchData();
  },[cardname]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(price)

  return (
    <div>{price}</div>
  );
}