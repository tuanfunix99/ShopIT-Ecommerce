import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import allActions from "../../store/actions/index";
import { useEffect } from "react";
import CardProduct from "../../components/card/CardProduct";
import Loader from "../../components/loader/Loader";
import Pagination from "react-js-pagination";
import MetaData from '../../components/meta-data/MetaData';

const Home = () => {
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      allActions.productActs.fetchAllProduct({
        page: currentPage
      })
    );
  }, [dispatch, currentPage]);

  const displayProduct = () => {
    if (products && products.products.length > 0) {
      return products.products.map((product, key) => {
        return <CardProduct key={key} product={product} col={4} />;
      });
    }
  };

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <Header />
      <MetaData title={"Home"} />
      {!loading && (
        <div className="main">
          <div className="container">
            <h1 id="products_heading">Latest Products</h1>
            <div className="row">{displayProduct()}</div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={6}
              totalItemsCount={products ? products.count : 0}
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      )}
      {loading && <Loader />}
      <Footer />
    </Fragment>
  );
};

export default Home;
