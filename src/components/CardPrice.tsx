import React, {useState, useEffect} from 'react';

type CardQuery = {
  query: string;
}

export const CardPrice: React.FC<CardQuery> = ({ query }) => {
  const [price, setPrices] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`/api/check/${query}`).then(res => res.json());
      setPrices(result.price);
      setIsLoading(false);
    }

    fetchData();
  },[query]);

  if (isLoading) {
    return <div>0.00</div>
  }

  return (
    <div>{price}</div>
  );
}