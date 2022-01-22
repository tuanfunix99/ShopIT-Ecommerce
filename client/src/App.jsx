import React, { Fragment, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import allActions from "./actions/index";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Loader from "./components/loader/Loader";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/profile/UpdateProfile";
import UpdatePassword from "./pages/profile/UpdatePassword";
import ProductDetails from "./pages/product/ProductDetail";
import NotFound from "./pages/not-found/NotFound";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(allActions.userActs.fetchUser());
  }, [dispatch]);

  return (
    <Fragment>
      {!loading && (
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      )}
      {loading && <Loader />}
    </Fragment>
  );
}

export default App;
