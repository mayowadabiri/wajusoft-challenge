const rotateFunction = (string, n) => {
  const slicedLetters = string.slice(0, n);
  const otherWords = string.slice(n);
  const joinedWords = `${otherWords}${slicedLetters}`;
  return joinedWords;
};

rotateFunction("javascript", 2);

const arrangeArr = (arr) => {
  const highest = Math.max(...arr);
  const lowest = Math.min(...arr);
  console.log(lowest);
  const copiedArray = [...arr];

  const highesIndeIndex = copiedArray.findIndex((item) => item === highest);
  const lowestIndex = copiedArray.findIndex((item) => item === lowest);
  copiedArray.splice(highesIndeIndex, 1);
  copiedArray.splice(lowestIndex, 1);
  copiedArray.unshift(highest);
  copiedArray.push(lowest);

  console.log(copiedArray);
};

arrangeArr([90, 10, 5, 14, 5, 2, 100, 1]);
