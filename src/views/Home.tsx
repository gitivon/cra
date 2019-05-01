import React, { SFC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';

export const Home: SFC<RouteComponentProps> = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Home
      <h1 onClick={() => setCount(count + 1)}>Hello React {count}</h1>
    </div>
  );
};
