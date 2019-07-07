import React from 'react';
import styled from 'styled-components'
import { buttonsHeight, initButton, bordersColor } from '../helpers';

const StopButtonStyled = styled.button`
  ${initButton}
  position: absolute !important;
  background: ${bordersColor};
  border-radius: 100%;
  div {
    background-color: white;
    height: ${buttonsHeight / 5}px;
    width: ${buttonsHeight / 5}px;
  }
  height: ${buttonsHeight / 2}px;
  width: ${buttonsHeight / 2}px;
  top: ${buttonsHeight * 0.1}px;
  left: ${buttonsHeight * 0.2}px;
`


const StopButton = ({ stopEvent, breast }) =>
  <StopButtonStyled onClick={stopEvent} breast={breast} >
    <div />
  </StopButtonStyled>

export default StopButton;
