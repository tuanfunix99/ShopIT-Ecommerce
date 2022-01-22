import React, { Fragment } from "react";

import './Button.css';

const Button = ({ children, id, type, disabled, className, onClick }) => {
  return (
    <Fragment>
      <button
        id={id ? id : ""}
        type={type ? type : "submit"}
        className={ className ? className : ""}
        disabled={disabled ? disabled : false}
        onClick={onClick ? onClick : null}
      >
        { children }
      </button>
    </Fragment>
  );
};

export default Button;
