import React from 'react';

type DateObj = {
  date: string;
}

export const DateNow: React.FC<DateObj> = ({date}) => {

  let dayOfweek = date.substr(0,3);
  let month_day = date.substr(4,6);


  return (
    <>{dayOfweek}, {month_day}</>
  )
}