import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import "./Access.css";

const AccessPage = ({ children, passportId }) => {
  const { user } = useSelector((state) => state.user);

  const templateAlert = (title, message) => {
    return (
      <div className="container-fluid access-denided-page my-0 py-0">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="alert-access-denied">
              <img src="/images/access_denied.png" alt="access denided" />
              <h1>{title}</h1>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {user && !passportId && children}
      {user &&
        passportId &&
        templateAlert("ACCESS DENIDED", "Account not support this feature.")}
      {!user &&
        templateAlert("ACCESS DENIDED", "Please login to access pages.")}
    </Fragment>
  );
};

export default AccessPage;
