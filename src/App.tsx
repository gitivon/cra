import React, { SFC, useState } from 'react';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';
import { HelloWorld } from './components/HelloWorld';
import { Router } from '@reach/router';

const GlobalStyled = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  h1 {
    color: red;
  }
`;

export const App: SFC = function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <GlobalStyled />
      <Router>
        <HelloWorld path="/" />
      </Router>
      <h1 onClick={() => setCount(count + 1)}>Hello React {count}</h1>
    </>
  );
};
