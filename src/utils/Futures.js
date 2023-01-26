export const getStatus = (key) => {
  switch (key) {
    case 0:
      return "Opérateur";
    case 1:
      return "Administrateur";
    default:
      break;
  }
};
export const numStr = (a, b) => {
  a = "" + a;
  b = b || " ";
  let c = "",
    d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (let i = a.length - 1; i >= 0; i--) {
    c = d !== 0 && d % 3 === 0 ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
};
export const capitalize = (str) => {
  if (typeof str === "string") {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  } else {
    return "";
  }
};
export const formatDate = (input) => {
  const date = new Date(input);
  return capitalize(
    new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
      timeStyle: "medium",
    }).format(date)
  );
};
export const dateFormat = (input) => {
  const date = new Date(input);
  return capitalize(
    new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
    }).format(date)
  );
};
