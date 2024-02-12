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
export const formatShortDate = (input) => {
  const date = new Date(input);
  return capitalize(
    new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
      timeStyle: "short",
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
export const formatPaiement = (input) => {
  const { CdtTrfTxInf,DbtrAgt, Dbtr, DbtrAcct, ReqdExctnDt } = input;

  return CdtTrfTxInf
    ? CdtTrfTxInf.map((item) => {
        const { Amt, Cdtr, CdtrAcct,CdtrAgt, RmtInf } = item;
 
        return {
          dateRemise: ReqdExctnDt ? formatShortDate(ReqdExctnDt[0]) : "",
          nom: Cdtr[0]["Nm"][0],
          compte:CdtrAgt[0]["BrnchId"][0]["Id"][0] +"-"+ CdtrAcct[0]["Id"][0]["Othr"][0]["Id"][0],
          montant: Amt[0]["InstdAmt"][0]["_"],
          devise: Amt[0]["InstdAmt"][0]["$"]["Ccy"],
          debuteur: {
            nom: Dbtr ? Dbtr[0]["Nm"][0] : "",
            compte: DbtrAcct ? DbtrAgt[0]["BrnchId"][0]["Id"][0] +"-"+DbtrAcct[0]["Id"][0]["Othr"][0]["Id"][0] : "",
            devise: DbtrAcct ? DbtrAcct[0]["Ccy"][0] : "",
          
          },
            motif :RmtInf ? RmtInf[0]["Ustrd"][0] : ""
        };
      })
    : [];
};
