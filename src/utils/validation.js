export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};
export const isNumeric = (value) => {
  const pattern = /^\d+$/;
  return pattern.test(value);
};
export const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};
export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};
export const capitaliz = (text) => {
  const txt = text.toLowerCase().split("");
  txt[0] = txt[0].toUpperCase();
  return txt.join("");
};
export const validateIPaddress = (ipaddress) => {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    ipaddress
  );
};
