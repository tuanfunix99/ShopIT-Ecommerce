import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }) => {
    
  const displayStar = (rating, number) => {
    if (rating >= number) {
      return <FaStar />;
    } else {
      if (rating >= (number + 0.5)) {
        return <FaStarHalfAlt />;
      } else {
        return <FaRegStar />;
      }
    }
  };

  return (
    <div className="rating">
      <span>{displayStar(rating, 1)}</span>
      <span>{displayStar(rating, 2)}</span>
      <span>{displayStar(rating, 3)}</span>
      <span>{displayStar(rating, 4)}</span>
      <span>{displayStar(rating, 5)}</span>
    </div>
  );
};

export default Rating;
