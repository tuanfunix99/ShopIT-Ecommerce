import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MetaData from "../../components/meta-data/MetaData";

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />
      <Header />
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />
          <h2>Your Order has been placed successfully.</h2>
          <Link to="/orders/me">Go to Orders</Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default OrderSuccess;
