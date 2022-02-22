import React, { Fragment, useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import MetaData from "../../components/meta-data/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import allActions from "../../store/actions/index";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Carousel } from "react-responsive-carousel";

import "./ProductDetail.css";
import Rating from "../../components/rating/Rating";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allActions.productActs.fetchProduct(id));
  }, [dispatch, id]);

  const onIncreaseQuantity = () => {
    if (quantity >= 10) {
      alert("Product just choose max 10 item");
      setQuantity(10);
    } else {
      if (product && product.stock - quantity > 0) {
        setQuantity(quantity + 1);
      }
    }
  };

  const onDecreaseQuantity = () => {
    if (product && product.stock - 1 > 0) {
      setQuantity(quantity - 1);
    }
  };

  const onClickAddToCartHandler = () => {
    const cartItem = {
      name: product && product.name,
      stock: product && product.stock,
      product: product && product._id,
      price: product && product.price,
      image: product && product.images[0].url,
      quantity: quantity,
    };
    dispatch(allActions.cartAcs.addToCart(cartItem));
  };

  return (
    <Fragment>
      <Header />
      {loading && <Loader />}
      {product && !loading && (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row d-flex justify-content-around px-5">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel verticalSwipe="vertical">
                {product.images &&
                  product.images.map((image, key) => (
                    <Fragment key={key}>
                      <img src={image.url} alt={product.title} />
                    </Fragment>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <div className="product-info">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />

                {/* <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div> */}
                <div className="ratings">
                  <Rating rating={product.ratings} />
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                <hr />

                <p id="product_price">${product.price}</p>
                {user && (
                  <Fragment>
                    <div className="stockCounter d-inline">
                      <span
                        className="btn btn-danger minus"
                        onClick={onDecreaseQuantity}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={quantity}
                        readOnly
                      />
                      <span
                        className="btn btn-primary plus"
                        onClick={onIncreaseQuantity}
                      >
                        +
                      </span>
                    </div>
                    <button
                      type="button"
                      id="cart_btn"
                      className="btn btn-primary d-inline ml-4"
                      disabled={product.stock === 0}
                      onClick={onClickAddToCartHandler}
                    >
                      Add to Cart
                    </button>

                    <hr />
                  </Fragment>
                )}
                <p>
                  Status:{" "}
                  <span
                    id="stock_status"
                    className={product.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                </p>

                {user ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review.
                  </div>
                )}

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
