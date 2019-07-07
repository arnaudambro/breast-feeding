import { css } from 'styled-components'

const doubleChiffre = number => (number < 10 ? '0' : '') + number;
export const formatChrono = chrono => {
  const minutes = Math.floor(chrono / 60000);
  const seconds = Math.round((chrono - minutes * 60000) / 1000);
  return doubleChiffre(minutes) + ' : ' + doubleChiffre(seconds);
}

export const formatTime = (date) => {
  const hours = (new Date(date)).getHours();
  const minutes = (new Date(date)).getMinutes();
  return hours + 'h' + doubleChiffre(minutes);
}

export const buttonsHeight = 100;
export const bordersColor = 'grey';
export const transitionDuration = 250;
export const color = {
  left: 'rgba(245, 91, 148, 1.00)',
  right: 'rgba(78, 171, 248, 1.00)',
  pump: 'rgba(242, 224, 150, 1.00)',
  '💩': 'rgba(142, 91, 44, 1.00)',
  '💊': 'rgba(245, 245, 245, 1.00)',
}

export const initButton = css`
  position: relative;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: ${buttonsHeight * 0.9}px;
  text-transform: uppercase;
  font-weight: 600;
  height: ${buttonsHeight * 0.9}px;
  width: ${buttonsHeight * 0.9}px;
  margin-left: ${buttonsHeight * 0.1}px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`
