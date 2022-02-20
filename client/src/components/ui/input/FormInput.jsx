import React, { Fragment } from "react";
import "./input.css";

const Input = ({
  textarea,
  label,
  type,
  id,
  className,
  name,
  value,
  onChange = () => {},
  required,
  isInvalid,
  disabled,
  error,
  min = 0,
  max = 1000,
  step = 1,
  children,
  select,
}) => {
  let rootClass = "form-control";
  if (className) {
    rootClass += " " + className;
  } else if (isInvalid) {
    rootClass += " invalid";
  }
  return (
    <Fragment>
      <div className="form-group">
        {label && <label htmlFor={id ? id : ""}>{label}</label>}
        {!textarea && !select && (
          <input
            type={type ? type : "text"}
            id={id ? id : ""}
            className={rootClass}
            name={name ? name : ""}
            value={value ? value : ""}
            required={required ? required : false}
            onChange={onChange}
            disabled={disabled ? disabled : false}
            min={min}
            max={max}
            step={step}
          />
        )}
        {textarea && (
          <textarea
            className={rootClass}
            onChange={onChange}
            disabled={disabled ? disabled : false}
            value={value ? value : ""}
            rows="7"
          />
        )}
        {select && (
          <select
            className={rootClass}
            onChange={onChange}
            disabled={disabled ? disabled : false}
            aria-label="Default select example"
            value={value ? value : ""}
          >
            {children}
          </select>
        )}
        {error && <div className="invalid-alert">{error}</div>}
      </div>
    </Fragment>
  );
};

export default Input;
