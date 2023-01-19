import React, { useEffect, useState } from "react";
import "./style.css";
const ToggleSwitch = ({ handleValidation, id, autovalidation, name }) => {
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = () => {
    handleValidation({ id, autovalidation, name });
    setChecked(autovalidation);
  };
  useEffect(() => {
    setChecked(autovalidation);
  }, [autovalidation]);

  return (
    <div className="toggle_switch">
      <label> {!checked || !autovalidation ? "Manuel" : ""} </label>
      <label class="switch">
        <input
          onClick={handleSwitchChange}
          type="checkbox"
          defaultChecked={checked}
        />
        <span class="slider round"></span>
      </label>
      <label>{checked || autovalidation ? "Auto" : ""}</label>
    </div>
  );
};

export default ToggleSwitch;
