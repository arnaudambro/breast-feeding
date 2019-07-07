import React from 'react';
import styled from 'styled-components'
import Current from './current/Current';
import History from './history/History';
import { bordersColor } from './helpers';


const AppStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .swipe-to-delete .js-content * {
      box-sizing: border-box;
      position: relative;
    }
  }
  .swipe-to-delete {
    border-bottom: 1px solid ${bordersColor};
  }
`


const App = ({ resetHistory }) =>
  <AppStyled>
    <Current />
    <History />
  </AppStyled>

export default App;
