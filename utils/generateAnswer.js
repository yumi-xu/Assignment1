export const generateAnswer = (phone) => {
  const lastDigit = +phone[phone.length - 1];
  const array = [];
  let num = lastDigit;
  while (num <= 100) {
    array.push(num);
    num += lastDigit;
  }
  return array[Math.floor(Math.random() * array.length)];
};
