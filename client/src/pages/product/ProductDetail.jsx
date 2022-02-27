import React, { Fragment, useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import MetaData from "../../components/meta-data/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import allActions from "../../store/actions/index";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Carousel } from "react-responsive-carousel";
import Rating from "../../components/rating/Rating";
import Button from "../../components/ui/button/Button";
import ListReviews from "./ListReviews";
import Toast from "../../utils/Toast";
import { Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import "./ProductDetail.css";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isReview, setIsReview] = useState(false);
  const [dataDismiss, setDataDismiss] = useState(null);
  const [ariaLabel, setAriaLabel] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, product, isCompleted, error } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!product) {
      dispatch(allActions.productActs.fetchProduct(id));
    }
    if (isCompleted) {
      dispatch(allActions.productActs.clear());
      setIsReview(false);
      setRating(0);
      setComment("");
      setShowReviewModal(false);
      Toast.success("Review successfully");
    }
  }, [dispatch, id, product, isCompleted]);

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
    if (quantity - 1 > 0) {
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

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const onAddNewReviewHandler = () => {
    setIsReview(true);
    dispatch(
      allActions.productActs.addNewReview({
        productId: product && product._id,
        rating: rating,
        comment: comment,
      })
    );
  };

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setRating(0);
    setComment("");
    setShowReviewModal(false);
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
              <Carousel>
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
                    onClick={handleShowReviewModal}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review.
                  </div>
                )}

                <div className="row mt-2 mb-5">
                  <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={100}
                        activeColor="#ffd700"
                      />
                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <Button
                        id="register_button"
                        type="submit"
                        className="product btn btn-block py-3 mb-2"
                        disabled={isReview}
                        onClick={onAddNewReviewHandler}
                        data_dismiss={dataDismiss}
                        aria_label={ariaLabel}
                      >
                        {!isReview && "ADD"}
                        {isReview && (
                          <div>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            HANDELING...
                          </div>
                        )}
                      </Button>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          {product && product.reviews.length > 0 && (
            <div className="container">
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <ListReviews reviews={product.reviews} />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
