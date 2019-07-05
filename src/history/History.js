import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import SwipeToDelete from 'react-swipe-to-delete-component';
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';
import { formatChrono, buttonsHeight, color, formatTime } from '../helpers';
import { deleteEvent, resetHistory } from './historyDucks';

const bordersColor = 'grey'

const HistoryStyled = styled.div`
  position: relative;
  border: 1px solid ${bordersColor};
  height: calc(100vh - ${buttonsHeight}px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .swipe-to-delete .js-content *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    position: relative;
  }
  .swipe-to-delete {
    border-bottom: 1px solid ${bordersColor};
  }
}
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`

const HeaderStyled = styled.header`
  position: sticky;
  top: -1px;
  height: 30px;
  background-color: rgba(243, 241, 243, 1.00);
  color: black;
  font-weight: 600;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
`

const Event = styled.div`
  height: ${buttonsHeight}px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  width: 100%;
`

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
`

const Time = styled.span`
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
`

const Duration = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  flex-grow: 1;
`

const Breast = styled.span`
  height: ${buttonsHeight * 0.8}px;
  width: ${buttonsHeight * 0.8}px;
  background-color: ${({ breast }) => color[breast]};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border-radius: 100%;
  margin-right: ${buttonsHeight * 0.1}px;
  flex-shrink: 0;
`


const ResetButton = styled.button`
  border: 1px solid black;
  box-shadow: none;
  font-size: 2em;
  height: ${buttonsHeight / 2}px;
  width: 100%;
  background: white;
  flex-shrink: 0;
  flex-grow: 0;
`


const StartAndEndTime = ({ start, end }) =>
  <TimeContainer>
    <Time>{formatTime(end, true)}</Time>
    <Time>{formatTime(start)}</Time>
  </TimeContainer>

class History extends React.Component {

  render() {
    const { history, deleteEvent, resetHistory } = this.props;

    if (!history) return null
    return(
      <HistoryStyled>
        {Object.keys(history).map(day => (
          <Section key={day}>
            <HeaderStyled>
              {(new Date(day)).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}
            </HeaderStyled>
            {history[day].sort((a, b) => a.start < b.start ? 1 : -1).map(event =>
              <SwipeToDelete key={event.id} onDelete={() => deleteEvent(day, event.id)}>
                <Event>
                  <StartAndEndTime start={event.start} end={event.start + event.duration} />
                  <Duration>{formatChrono(event.duration)}</Duration>
                  <Breast breast={event.breast} >{event.breast}</Breast>
                </Event>
              </SwipeToDelete>
            )}
          </Section>
        ))}
        {Boolean(Object.keys(history).length) && <ResetButton onClick={resetHistory}>Reset</ResetButton>}
      </HistoryStyled>
     )
  }
}

export default connect(() => state => state, { deleteEvent, resetHistory })(History);
