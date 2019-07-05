import React from 'react';
import styled from 'styled-components'
import Current from './current/Current';
import History from './history/History';


const AppStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`


const App = ({ resetHistory }) =>
  <AppStyled>
    <Current />
    <History />
  </AppStyled>

export default App;
