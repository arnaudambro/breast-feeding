import React from 'react';
import styled, { css } from 'styled-components'
import { bordersColor, buttonsHeight, transitionDuration } from '../helpers';

const deleteWidth = 75

const deletingCss = css`
  transition: all ${transitionDuration}ms ease-out;
  max-height: 0;
  * {
    outline: none;
  }
`

const Container = styled.div`
  height: auto;
  max-height: ${2 * buttonsHeight}px;
  width: auto;
  border-bottom: 1px solid ${bordersColor};
  position: relative;
  ${props => props.deleting && deletingCss}
`

const Content = styled.div`
  height: auto;
  width: auto;
  position: relative;
  transform: translateX(${({ translate }) => translate}px);
  ${props => props.transition && `transition: transform ${transitionDuration}ms ease-out`}
`

const Delete = styled.div`
  position: absolute;
  right: 0;
  height: ${buttonsHeight}px;
  width: 100%;
  top: 0;
  background: rgba(252, 58, 48, 1.00);
  font-weight: 400;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  button {
    width: ${deleteWidth}px;
    transition: margin ${transitionDuration}ms ease-in-out;
    margin-left: ${({ buttonMarginLeft }) => buttonMarginLeft}px;
    text-align: center;
    height: 100%;
    background: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
`

const cursorPosition = e => e.touches ? e.touches[0].clientX : e.clientX;

class SwipeToDelete extends React.Component {

  state = {
    touching: null,
    translate: 0,
    deleting: false,
  }

  onMouseDown = (e) => {
    if (this.state.touching) return;
    this.startTouchPosition = cursorPosition(e);
    this.initTranslate = this.state.translate;
    this.setState({ touching: true }, () => {
      this.addEventListenerToMoveAndUp()
    })
  };

  addEventListenerToMoveAndUp = (remove = false) => {
    if (remove) {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('touchmove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('touchend', this.onMouseUp);
    } else {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('touchend', this.onMouseUp);
    }
  }

  onMouseMove = (e) => {
    if (!this.state.touching) return
    cursorPosition(e)
    if (cursorPosition(e) > this.startTouchPosition - this.initTranslate) {
      this.setState({ translate: 0 })
      return;
    }
    this.setState({ translate: cursorPosition(e) - this.startTouchPosition + this.initTranslate })
  };

  onMouseUp = () => {
    this.startTouchPosition = null;
    const newState = {
      touching: false
    }
    const acceptableMove = -deleteWidth * 0.7;
    const showDelete = this.state.translate < acceptableMove;
    const notShowDelete = this.state.translate >= acceptableMove;
    const deleteWithoutConfirm = -this.state.translate >= this.deleteWithoutConfirmThreshold;
    if (deleteWithoutConfirm) newState.translate = -this.containerWidth;
    if (notShowDelete) newState.translate = 0;
    if (showDelete && !deleteWithoutConfirm) newState.translate = -deleteWidth;
    this.setState(newState, () => {
      if (deleteWithoutConfirm) this.onDeleteClick()
    });

    this.addEventListenerToMoveAndUp(true)
  }

  onDeleteClick = () => {
    this.setState({ deleting: true }, () => {
      window.setTimeout(() => {
        this.props.onDelete();
      }, transitionDuration)
    })
  }

  componentWillUnmount() {
    this.addEventListenerToMoveAndUp(true)
  }

  render() {
    const { translate, touching, deleting } = this.state;
    const shiftDelete = -translate >= this.deleteWithoutConfirmThreshold;
    return(
      <Container deleting={deleting} ref={c => {
        if (c) {
          this.container = c
          this.containerWidth = c.getBoundingClientRect().width;
          this.deleteWithoutConfirmThreshold = this.containerWidth * 0.75;
        }
      }}>
        <Delete
          withoutConfirm={shiftDelete}
          buttonMarginLeft={shiftDelete ? this.containerWidth + translate : this.containerWidth - deleteWidth}
        >
          <button onClick={this.onDeleteClick}>Delete</button>
        </Delete>
        <Content
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
          translate={translate}
          transition={!touching}

        >
          {this.props.children}
        </Content>
      </Container>
     )
  }
}

export default SwipeToDelete;
