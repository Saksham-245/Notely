export const isValidEmail = (email) => {
  return email.includes("@");
};

export const isValidPassword = (password) => {
  return password.length >= 8;
};

export const isValidUsername = (username) => {
  return username.length >= 3;
};

export const isValidName = (name) => {
  return name.length >= 3;
};
