import React from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../search/Search";
import Permission from "../permission/Permission";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/shopit_logo.png" alt="logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search navigate={navigate} />
          {/* <Route render={({ history }) => <Search history={history} />} /> */}
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
            { carts }
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && (
                  <Permission userRole={user.role} roles={["admin"]}>
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  </Permission>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <a
                  className="dropdown-item text-danger"
                  href="/api/v1/user/auth/logout"
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn ml-4" id="login_btn">
              Login
            </Link>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
