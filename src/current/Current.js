import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'
import { formatChrono, buttonsHeight, color } from '../helpers';
import { updateDuration, startEvent, stopEvent } from './currentDucks';

const CurrentContainer = styled.div`
  height: ${buttonsHeight}px;
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  align-items: center;
  font-size: 2em;
  background-color: ${({ breast }) => color[breast]};
`

const Breast = styled.span`
  font-size: 1em;
  text-transform: uppercase;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export const initButton = css`
  position: relative;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  flex: 1 1 100%;
  text-transform: uppercase;
  font-weight: 600;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const BreastGaucheButton = styled.button`
  ${initButton}
  background-color: ${color.left};
`

const BreastDroitButton = styled.button`
  ${initButton}
  background-color: ${color.right};
`

const PumpButton = styled.button`
  ${initButton}
  background-color: ${color.pump};
`

const StopButtonStyled = styled.button`
  ${initButton}
  background-color: white;
  border-radius: 100%;
  div {
    background-color: ${({ breast }) => color[breast]};
    height: ${buttonsHeight / 5}px;
    width: ${buttonsHeight / 5}px;
  }
  height: ${buttonsHeight / 2}px;
  flex-basis: ${buttonsHeight / 2}px;
  flex-grow: 0;
`

const StopButton = ({ stopEvent, breast }) =>
  <StopButtonStyled onClick={stopEvent} breast={breast} >
    <div />
  </StopButtonStyled>

const Button = ({ Component, startEvent, value }) =>
  <Component value={value} onClick={() => startEvent(value)} >
    {value}
  </Component>

const ButtonConnected = connect(null, { startEvent })(Button);

class Current extends React.Component {

  componentDidMount() {
    if (!window.duration) {
      this.updateDuration()
    }
  }
  componentDidUpdate() {
    this.updateDuration()
  }

  updateDuration = () => {
    const { updateDuration, breast } = this.props;
    if (breast) {
      const timeInterval = 1000;
      window.duration = window.setTimeout(() => {
        updateDuration(timeInterval)
      }, timeInterval)
    }
    if (!breast && this.duration) {
      window.clearTimeout(window.duration)
    }
  }

  handleStopEvent = () => {
    const { breast, duration, stopEvent, start } = this.props;
    stopEvent({ breast, duration, start })
    window.clearTimeout(window.duration)
  }

  render() {

    const { breast, duration } = this.props;

    return(
      <CurrentContainer breast={breast}>
        {breast
        ? <>
            <Breast>{breast}</Breast>
            <span>{formatChrono(duration)}</span>
            <StopButton breast={breast} stopEvent={this.handleStopEvent} />
          </>
        : <>
            <ButtonConnected
              value="left"
              Component={BreastGaucheButton}
            />
            <ButtonConnected
              value="pump"
              Component={PumpButton}
            />
            <ButtonConnected
              value="right"
              Component={BreastDroitButton}
            />
          </>
        }
      </CurrentContainer>

     )
  }
}

export default connect(() => state => state.current, { updateDuration, stopEvent })(Current);
