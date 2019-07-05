

const doubleChiffre = number => (number < 10 ? '0' : '') + number;
export const formatChrono = chrono => {
  const minutes = Math.floor(chrono / 60000);
  const seconds = (chrono - minutes * 60000) / 1000;
  return doubleChiffre(minutes) + ' : ' + doubleChiffre(seconds);
}

export const formatTime = (date) => {
  const hours = (new Date(date)).getHours();
  const minutes = (new Date(date)).getMinutes();
  return hours + 'h' + doubleChiffre(minutes);
}

export const buttonsHeight = 100
export const color = {
  left: 'rgba(238, 26, 65, 1.00)',
  right: 'rgba(78, 171, 248, 1.00)',
  pump: 'rgba(242, 224, 150, 1.00)',
}
