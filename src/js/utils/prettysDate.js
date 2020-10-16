export const prettysDate = function (date) {
  let prettysDate = Date.parse(date);
  let dateCopy = new Date(prettysDate);
  dateCopy = dateCopy.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
  dateCopy = dateCopy.split(' ');
  return prettysDate = `${dateCopy[0]} ` + `${dateCopy[1]}, ` + dateCopy[2];
}