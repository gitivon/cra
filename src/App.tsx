import React, { SFC, useState } from 'react';

export const App: SFC = function App() {
  const [count, setCount] = useState(0);
  return <h1 onClick={() => setCount(count + 1)}>Hello React {count}</h1>;
};
