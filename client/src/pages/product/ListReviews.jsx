import React from "react";
import Rating from "../../components/rating/Rating";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="review-card my-3">
            <div className="ratings">
              <Rating rating={review.rating} />
            </div>
            <p className="review_user">by {review.user.username}</p>
            <p className="review_comment">{review.comment}</p>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
