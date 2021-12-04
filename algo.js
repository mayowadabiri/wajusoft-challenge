const rotateFunction = (string, n) => {
  const slicedLetters = string.slice(0, n);
  const otherWords = string.slice(n);
  const joinedWords = `${otherWords}${slicedLetters}`;
  return joinedWords;
};

rotateFunction("javascript", 2);

