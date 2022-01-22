import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import "./Access.css";

const AccessPage = ({ children, googleId }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {user && !googleId && children}
      {user && googleId && (
        <div className="container-fluid access-denided-page my-0 py-0">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src="/images/access_denied.png" alt="access denided" />
              <h1>ACCESS DENIDED</h1>
              <p>Account not support this feature.</p>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="container-fluid access-denided-page my-0 py-0">
          <div className="row">
            <div className="col-lg-12 text-center">
              <img src="/images/access_denied.png" alt="access denided" />
              <h1>ACCESS DENIDED</h1>
              <p>Please login to access pages.</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AccessPage;
