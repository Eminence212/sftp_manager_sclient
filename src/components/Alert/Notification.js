import React from "react";
import swal from "@sweetalert/with-react";

export const message = (text, icon) => {
  const notification = {
    text,
    icon,
    button: "Fermer",
    // dangerMode: icon === "error" ? true : false,
    closeOnClickOutside: false,
    closeOnEsc: false,
  };
  swal(notification);
};
