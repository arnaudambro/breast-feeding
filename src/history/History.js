import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { buttonsHeight, bordersColor } from '../helpers';
import { deleteEvent, resetHistory } from './historyDucks';
import Event from '../event/Event';

const HistoryStyled = styled.div`
  position: relative;
  border: 1px solid ${bordersColor};
  height: calc(100vh - ${buttonsHeight}px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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
  padding-left: 20px;
  background-color: rgba(243, 241, 243, 1.00);
  color: black;
  font-weight: 600;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
`

const ResetButton = styled.button`
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  box-shadow: none;
  font-size: 2em;
  height: ${buttonsHeight / 2}px;
  width: 100%;
  background: white;
  flex-shrink: 0;
  flex-grow: 0;
`

class History extends React.Component {

  render() {
    const { history, deleteEvent, resetHistory } = this.props;

    if (!history) return null
    return(
      <HistoryStyled>
        {Object.keys(history).sort((a, b) => Date.parse(a) < Date.parse(b) ? 1 : -1).map(day => (
          <Section key={day}>
            <HeaderStyled>
              {(new Date(day)).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}
            </HeaderStyled>
            {history[day].sort((a, b) => a.start < b.start ? 1 : -1).map(event =>
              <Event
                swipeable
                key={event.id}
                event={event}
                deleteEvent={(id) => deleteEvent(day, id)}
              />
            )}
          </Section>
        ))}
        {Boolean(Object.keys(history).length) && <ResetButton onClick={resetHistory}>Reset</ResetButton>}
      </HistoryStyled>
     )
  }
}

export default connect(() => state => state, { deleteEvent, resetHistory })(History);
