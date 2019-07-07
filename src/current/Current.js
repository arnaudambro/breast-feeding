import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'
import { buttonsHeight, color, initButton, bordersColor } from '../helpers';
import { updateDuration, startEvent, stopEvent } from './currentDucks';
import Event from '../event/Event';

const cssOverflow = css`
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  &::after {
    content: "";
    width: ${buttonsHeight * 0.1}px;
    border: 1px solid transparent;
    flex-shrink: 0;
  }
`

const CurrentContainer = styled.div`
  height: ${buttonsHeight}px;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background-color: ${({ breast }) => color[breast]};
  flex-wrap: nowrap;
  ${props => !props.breast && cssOverflow}
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

const PoopButton = styled.button`
  ${initButton}
  background-color: ${color['💩']};
  font-size: 3em;
`

const MedicMamaButton = styled.button`
  ${initButton}
  background-color: ${color['💊']};
  border: 1px solid ${bordersColor};
  font-size: 3em;
`

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

    const { breast } = this.props;

    return(
      <CurrentContainer breast={breast}>
        {breast
        ? <Event event={this.props} startOnly stopEvent={this.handleStopEvent}/>
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
            <ButtonConnected
              value="💩"
              Component={PoopButton}
            />
            <ButtonConnected
              value="💊"
              Component={MedicMamaButton}
            />
          </>
        }
      </CurrentContainer>

     )
  }
}

export default connect(() => state => state.current, { updateDuration, stopEvent })(Current);
