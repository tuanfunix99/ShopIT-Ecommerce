import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import allActions from "../../actions/index";
import { useEffect } from "react";
import CardProduct from "../../components/card/CardProduct";
import Loader from "../../components/loader/Loader";

const Home = () => {
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.productActs.fetchAllProduct());
  }, [dispatch]);

  const displayProduct = () => {
    if (products && products.length > 0) {
      return products.map((product, key) => {
        return <CardProduct key={key} product={product} col={4} />;
      });
    }
  };

  return (
    <Fragment>
      <Header />
      {!loading && (
        <div className="main">
          <div className="container">
            <div className="row">{displayProduct()}</div>
          </div>
        </div>
      )}
      {loading && <Loader />}
      <Footer />
    </Fragment>
  );
};

export default Home;
