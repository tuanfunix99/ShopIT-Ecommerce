import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions/index";
import { Link, useParams } from "react-router-dom";

import AccessPage from "../../components/access/AccessPage";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MetaData from "../../components/meta-data/MetaData";
import Loader from '../../components/loader/Loader';

const OrderDetails = () => {
  const { orderDetails, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector(state => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {shippingInfo, totalPrice, orderStatus, orderItems, _id} = orderDetails;

  const isPaid = orderStatus && orderStatus === "Processing" ? false : true;

  useEffect(() => {
    dispatch(allActions.orderAcs.getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <AccessPage roles={["user", "admin"]}>  
      <Header />
      <MetaData title={"Order Details"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details mx-auto">
              <h1 className="my-5">Order # {_id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.username}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address: </b>
                {shippingInfo && shippingInfo.address + ', ' + shippingInfo.city}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus &&
                  String(orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}

      <Footer />
    </AccessPage>
  );
};

export default OrderDetails;
