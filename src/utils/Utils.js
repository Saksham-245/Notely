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

export const normalizeImageUrl = (url) => {
  if (!url) return null;
  return url
    .replace("localhost:3000", "apinotely.sakshammathur.in")
    .replace("10.0.2.2:3000", "apinotely.sakshammathur.in")
    .replace("http://", "https://");
};

export const normalizeImageUri = (uri) => {
  if (!uri) return null;
  return Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
};
