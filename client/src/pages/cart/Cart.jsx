import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccessPage from "../../components/access/AccessPage";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MetaData from "../../components/meta-data/MetaData";
import allActions from "../../store/actions";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCartItemHandler = (product) => {
    dispatch(allActions.cartAcs.deleteCartItem(product));
  };

  const increaseQtyHandler = (item) => {
    const itemClone = { ...item };
    itemClone.quantity += 1;
    if (itemClone.quantity > 10) {
      alert("Product just choose max 10 item");
    } else {
      if (itemClone.stock - itemClone.quantity > 0) {
        dispatch(allActions.cartAcs.updateQtyItem({ ...itemClone }));
      }
    }
  };

  const decreaseQtyHandler = (item) => {
    const itemClone = { ...item };
    itemClone.quantity -= 1;
    if (itemClone.quantity > 0) {
      dispatch(allActions.cartAcs.updateQtyItem({ ...itemClone }));
    }
  };

  const checkoutHandler = () => {
    if(cartItems.length > 0) {
      navigate('/shipping')
    }
  }

  return (
    <Fragment>
      <AccessPage roles={["user", "admin"]}>
        <MetaData title={"Your Cart"} />
        <Header />
        {cartItems.length === 0 ? (
          <h2 className="mt-5 px-5">Your Cart is Empty</h2>
        ) : (
          <Fragment>
            <h2 className="mt-5 mx-5">
              Your Cart: <b>{cartItems.length} items</b>
            </h2>

            <div className="row d-flex justify-content-between px-5">
              <div className="col-12 col-lg-8">
                {cartItems.map((item, key) => (
                  <Fragment key={key}>
                    <hr />

                    <div className="cart-item" key={item.product}>
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                          />
                        </div>
                        <div className="col-5 col-lg-3">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span
                              className="btn btn-danger minus"
                              onClick={() => decreaseQtyHandler(item)}
                            >
                              -
                            </span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary plus"
                              onClick={() => increaseQtyHandler(item)}
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={() => removeCartItemHandler(item.product)}
                          ></i>
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
                    <span className="order-summary-values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (Units)
                    </span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span className="order-summary-values">
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    className="btn btn-primary btn-block"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        <Footer />
      </AccessPage>
    </Fragment>
  );
};

export default Cart;
