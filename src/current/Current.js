import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'
import { buttonsHeight, color, initButton, bordersColor } from '../helpers';
import { updateDuration, startEvent, stopEvent } from './currentDucks';
import gong from '../assets/gong.m4a'
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

const Sound = styled.audio`
  height: 0;
  position: absolute;
  width: 0;
  visibility: hidden;
  pointer-events: none;
`

const Button = ({ Component, startEvent, value }) =>
  <Component value={value} onClick={() => startEvent(value)} >
    {value}
  </Component>

class Current extends React.Component {

  componentDidMount() {
    if (!window.duration) {
      this.updateDuration()
    }
    this.playGongFirstTime = false;
    this.playGongSecondTime = false;
  }
  componentDidUpdate() {
    this.updateDuration()
    if (this.props.duration > 60000 * 20 && this.playGongFirstTime) {
      this.playGongFirstTime = false;
      this.gong.play()
    }
    if (this.props.duration > 60000 * 25 && this.playGongSecondTime) {
      this.playGongSecondTime = false;
      this.gong.play()
    }
  }

  updateDuration = () => {
    const { updateDuration, breast } = this.props;
    if (breast) {
      const timeInterval = 1000;
      window.duration = window.setTimeout(() => {
        updateDuration(timeInterval)
      }, timeInterval)
    }
    if (!breast && window.duration) {
      window.clearTimeout(window.duration)
    }
  }

  handleStopEvent = () => {
    const { breast, duration, stopEvent, start } = this.props;
    stopEvent({ breast, duration, start })
    window.clearTimeout(window.duration)
    this.gong.pause()
    this.gong.currentTime = 0

  }

  handleStartEvent = value => {
    this.gong.play();
    this.gong.pause();
    this.gong.currentTime = 0;
    this.props.startEvent(value)
  }

  render() {

    const { breast } = this.props;

    return(
      <>
        <Sound src={gong} ref={g => this.gong = g} />
        <CurrentContainer breast={breast}>
          {breast
          ? <Event event={this.props} startOnly stopEvent={this.handleStopEvent}/>
          : <>
              <Button
                value="left"
                Component={BreastGaucheButton}
                startEvent={this.handleStartEvent}
              />
              <Button
                value="pump"
                Component={PumpButton}
                startEvent={this.handleStartEvent}
              />
              <Button
                value="right"
                Component={BreastDroitButton}
                startEvent={this.handleStartEvent}
              />
              <Button
                value="💩"
                Component={PoopButton}
                startEvent={this.handleStartEvent}
              />
              <Button
                value="💊"
                Component={MedicMamaButton}
                startEvent={this.handleStartEvent}
              />
            </>
          }
        </CurrentContainer>
      </>

     )
  }
}

export default connect(() => state => state.current, { updateDuration, stopEvent, startEvent })(Current);
