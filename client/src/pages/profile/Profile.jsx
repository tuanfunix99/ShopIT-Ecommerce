import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MetaData from "../../components/meta-data/MetaData";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AccessPage from "../../components/access/AccessPage";
import Permission from "../../components/permission/Permission";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Fragment>
      <Header />
      <AccessPage>
        <MetaData title={"Your Profile"} />
        <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info">
          <div className="col-12 col-md-3">
            <figure className="avatar avatar-profile">
              <img
                className="rounded-circle img-fluid"
                src={user && user.avatar.url}
                alt={user && user.username}
              />
            </figure>
            <Link
              to="/me/update"
              id="edit_profile"
              className="btn btn-primary btn-block my-5"
            >
              Edit Profile
            </Link>
          </div>

          <div className="col-12 col-md-5">
            <h4>Full Name</h4>
            <p>{user && user.username}</p>

            <h4>Email Address</h4>
            <p>{user && user.email}</p>

            <h4>Joined On</h4>
            <p>{user && String(user.createdAt).substring(0, 10)}</p>

            {user && (
              <Permission userRole={user.role} roles={["admin"]}>
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              </Permission>
            )}
            {user && !user.googleId && (
              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            )}
          </div>
        </div>
        <Footer />
      </AccessPage>
    </Fragment>
  );
};

export default Profile;
