import React from 'react';

interface Props {
  name: string;
}

export const Example1: React.FC<Props> = ({name}) => {
  return (
    <div>Hello world! I am {name} </div>
  );
}