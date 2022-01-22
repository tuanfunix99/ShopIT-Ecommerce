import React, { Fragment } from "react";
import "./input.css";

const Input = ({
  label,
  type,
  id,
  className,
  name,
  value,
  onChange,
  required,
  isInvalid,
  disabled,
  error,
}) => {
  let rootClass = "form-control";
  if(className) {
    rootClass += " " + className;
  }
  else if(isInvalid) {
    rootClass += " invalid";
  }
  return (
    <Fragment>
      <div className="form-group">
        {label && <label htmlFor={id ? id : ""}>{label}</label>}
        <input
          type={type ? type : "text"}
          id={id ? id : ""}
          className={rootClass}
          name={name ? name : ""}
          value={value ? value : ""}
          required={required ? required : false}
          onChange={onChange ? onChange : ""}
          disabled={disabled ? disabled : false}
        />
        {error && (
          <div className="invalid-alert">
           { error }
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Input;
