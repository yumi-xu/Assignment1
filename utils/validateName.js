export const validateName = (name) => {
  if (/\d/.test(name)) {
    return "Name should only contain non-numeric characters";
  }
  if (name.length <= 1) {
    return "Name should contain at least 2 characters";
  }
  return "";
};