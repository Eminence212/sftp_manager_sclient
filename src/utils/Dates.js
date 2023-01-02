export const convertDate = (inputFormat) => {
  const date = new Date(inputFormat);
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(date);
};
