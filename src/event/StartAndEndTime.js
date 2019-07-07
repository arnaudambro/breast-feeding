import React from 'react';
import styled from 'styled-components'
import { buttonsHeight, formatTime } from '../helpers';

const bordersColor = 'grey'

const TimeContainer = styled.div`
  width: ${buttonsHeight * 0.9}px;
  height: ${buttonsHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${buttonsHeight / 10}px;
  padding-left: 0;
  &:before {
    content: "";
    height: 100%;
    position: absolute;
    background: ${bordersColor};
    width: 1px;
    top: 0;
    bottom: 0;
    right: 0;
    left: ${buttonsHeight / 4}px;
  }
  ${props => props.singleTime && 'justify-content: center;'}
`

const Time = styled.span`
  position: relative;
  color: ${bordersColor};
  display: flex;
  justify-content: flex-end;
  width: 100%;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: ${buttonsHeight / 4 - buttonsHeight / 20}px;
    width: ${buttonsHeight / 10}px;
    height: ${buttonsHeight / 10}px;
    margin-top: auto;
    margin-bottom: auto;
    border-radius: 100%;
    background: ${bordersColor};
  }
  ${props => props.startOnly && 'visibility: hidden;'}
  ${props => props.singleTime && 'display: none;'}
`

const StartAndEndTime = ({ start, end, startOnly, singleTime }) =>
  <TimeContainer singleTime={singleTime && !startOnly}>
    <Time singleTime={singleTime && !startOnly} startOnly={startOnly} >{startOnly ? 'plouf' : formatTime(end)}</Time>
    <Time>{formatTime(start)}</Time>
  </TimeContainer>


export default StartAndEndTime
