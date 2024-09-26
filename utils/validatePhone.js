export const validatePhone = (phone) => {
  if (!/^\d{10}$/.test(phone) || phone[phone.length - 1] < 2) {
    return "Invalid phone number!";
  }
  return "";
};
