import React, { useEffect, useState } from "react";
import "./style.css";
const ToggleSwitch = ({ handleValidation, id, autovalidation,name }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    handleValidation({id, autovalidation,name});
    // setChecked(!checked);
  };
  useEffect(() => {
    setChecked(autovalidation);
  }, [autovalidation]);

  return (
    <div className="toggle_switch">
      <label> {!checked && "Manuel"} </label>
      <label class="switch">
        <input onClick={handleChange} type="checkbox" checked={checked} />
        <span class="slider round"></span>
      </label>
      <label>{checked && "Auto"}</label>
    </div>
  );
};

export default ToggleSwitch;
