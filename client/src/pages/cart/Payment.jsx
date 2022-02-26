import React, { Fragment, useState } from "react";
import MetaData from "../../components/meta-data/MetaData";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutStep from "./CheckoutStep";
import axios from "axios";
import Button from "../../components/ui/button/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AccessPage from "../../components/access/AccessPage";
import Toast from "../../utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions/index";
import { useNavigate } from "react-router-dom";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
  const navigate = useNavigate();

  const order = {
    orderItems: cartItems,
    shippingInfo: shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (orderInfo) {
      try {
        const { data } = await axios.post("/api/v1/payment/process", {
          amount: Math.round(parseFloat(orderInfo.totalPrice) * 100),
        });
       
        const payload = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        });

        if (payload.error) {
          Toast.error("Error processing. Please try again later");
          setLoading(false);
        } else {
          if (payload.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: payload.paymentIntent.id,
              status: payload.paymentIntent.status,
            };
            dispatch(allActions.orderAcs.createOrder(order));
            if (!error) {
              dispatch(allActions.cartAcs.clearCart());
              navigate("/order-success");
            } else {
              Toast.error("Error processing. Please try again later");
              setLoading(false);
            }
          }
        }
      } catch (error) {
        Toast.error("Error processing. Please try again later");
        setLoading(false);
      }
    } else {
      Toast.error("Order Info not found. Please try again later");
      setLoading(false);
    }
  };

  return (
    <AccessPage roles={["admin", "user"]}>
      <Header />
      <MetaData title={"Payment"} />
      <CheckoutStep shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={onSubmitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>
            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>
            <Button
              type="submit"
              className="admin btn btn-block py-3 mb-2"
              disabled={loading}
            >
              {!loading && "PAYMENT"}
              {loading && (
                <div>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  PROCESSING...
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </AccessPage>
  );
};

export default Payment;
