import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { store, persistor } from './store';


const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: #111;
    font-family: sans-serif;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
`;
export default GlobalStyle;

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <GlobalStyle />
          <App />
        </>
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
};
render();

if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./App'], () => {
    render();
  });
}
