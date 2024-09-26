export const checkUserAnswerValid = (userAnswer, lastDigit) => {
  if (!userAnswer.length) {
    return false; // empty input
  }
  const num = +userAnswer;
  if (!num) {
    return false; // invalid number
  }
  if (num < 1 || num > 100) {
    return false; // must be between 1~100
  }
  if (num % lastDigit) {
    return false; // number is not in the answer pool
  }
  return true;
};
