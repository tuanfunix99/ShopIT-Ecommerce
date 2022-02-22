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
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import MetaData from "../../components/meta-data/MetaData";

const Search = () => {
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [category, setCategory] = useState("");
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  const { keyword } = useParams();

  useEffect(() => {
    dispatch(
      allActions.productActs.fetchAllProduct({
        page: currentPage,
        keyword: keyword ? keyword : "",
        price,
        category,
      })
    );
  }, [dispatch, currentPage, keyword, price, category]);

  const displayProduct = () => {
    if (products && products.products.length > 0) {
      return products.products.map((product, key) => {
        return <CardProduct key={key} product={product} col={4} />;
      });
    }
  };

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <Header />
      <MetaData title={"Search"} />
      <div className="main">
        <div className="container">
          <h1 id="products_heading">Latest Products</h1>

          <div className="row">
            <Fragment>
              <div className="col-6 col-md-3 mt-5 mb-5">
                <div className="px-5">
                  <Range
                    marks={{
                      1: `$1`,
                      10000: `$10000`,
                    }}
                    min={1}
                    max={10000}
                    defaultValue={[1, 10000]}
                    tipFormatter={(value) => `$${value}`}
                    tipProps={{
                      placement: "top",
                      visible: true,
                    }}
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />
                </div>
                <hr className="my-5" />

                <div className="mt-5">
                  <h4 className="mb-3">Categories</h4>

                  <ul className="pl-0">
                    {categories.map((cat) => (
                      <li
                        className={cat === category ? 'active-item' : 'item'}
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={cat}
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9">
                {!loading && <div className="row">{displayProduct()}</div>}
                {loading && <Loader />}
              </div>
            </Fragment>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={6}
            totalItemsCount={products && products.count}
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
      <Footer />
    </Fragment>
  );
};

export default Search;
