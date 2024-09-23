export const validateEmail = (email) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email!";
  }
  return "";
};