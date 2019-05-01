import React, { SFC, useState } from 'react';
import { createGlobalStyle, ServerStyleSheet } from 'styled-components';
import { HelloWorld } from './components/HelloWorld';
import { Router } from '@reach/router';
import { Home } from './views/Home';

const GlobalStyled = createGlobalStyle`
  * {
    outline: none;
  }
  body {
    margin: 0;
    padding: 0;
  }
  h1 {
    color: red;
  }
`;

export const App: SFC = function App() {
  return (
    <>
      <GlobalStyled />
      <Router>
        <Home path="/" />
        <HelloWorld path="/hello" />
      </Router>
    </>
  );
};
