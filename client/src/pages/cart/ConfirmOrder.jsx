import React, { Fragment } from "react";
import MetaData from "../../components/meta-data/MetaData";
import CheckoutStep from "./CheckoutStep";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions";
import AccessPage from "../../components/access/AccessPage";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    localStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <AccessPage roles={["user", "admin"]}>
      <MetaData title={"Shipping"} />
      <Header />
      <CheckoutStep shipping={true} confirmOrder={true} />
      <div className="row d-flex justify-content-between px-5">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.username}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, 
            ${shippingInfo.city}, 
            ${shippingInfo.postalCode}, 
            ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item, key) => (
            <Fragment key={key}>
              <hr />
              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </AccessPage>
  );
};

export default ConfirmOrder;
