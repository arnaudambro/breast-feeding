import React from 'react';
import styled from 'styled-components'
import SwipeToDelete from 'react-swipe-to-delete-ios';
import { formatChrono, buttonsHeight, color, bordersColor } from '../helpers';
import StartAndEndTime from './StartAndEndTime';
import StopButton from './StopButton';

const EventStyled = styled.div`
  height: ${buttonsHeight}px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  width: 100%;
  border-bottom: 1px solid ${bordersColor};
  * {
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
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
  margin-right: ${buttonsHeight * 0.1}px !important;
  flex-shrink: 0;
  ${({ breast }) => {
    if (breast === '💩') {
      return `font-size: 3em;`
    }
    if (breast === '💊') {
      return `font-size: 3em;
      border: 1px solid ${bordersColor};
      `
    }
  }}
`

const Event = ({ event, deleteEvent, swipeable, startOnly, stopEvent }) => {
  const Container = swipeable ? SwipeToDelete : React.Fragment;
  const containerProps = swipeable
  ? {
      onDelete: () => deleteEvent(event.id),
      height: buttonsHeight
    }
  : {}

  let message;
  switch (event.breast) {
    case '💊':
      message = 'MIAM'
      break;

    case '💩':
      message = 'BANCO'
      break;
    default:
      message = formatChrono(event.duration)
      break;
  }

  return(
    <Container {...containerProps} >
      <EventStyled>
        {startOnly && <StopButton stopEvent={stopEvent} />}
        <StartAndEndTime
          startOnly={startOnly}
          start={event.start}
          end={event.start + event.duration}
          singleTime={!event.duration}
        />
        <Duration>{message}</Duration>
        <Breast breast={event.breast} >{event.breast}</Breast>
      </EventStyled>
    </Container>
   )
}

export default Event
