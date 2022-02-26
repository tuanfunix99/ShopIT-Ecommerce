import React, { useState } from "react";
import AccessPage from "../../components/access/AccessPage";
import { countries } from "countries-list";
import FormInput from "../../components/ui/input/FormInput";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Button from "../../components/ui/button/Button";
import MetaData from "../../components/meta-data/MetaData";
import CheckoutStep from "./CheckoutStep";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(
    shippingInfo.address ? shippingInfo.address : ""
  );
  const [city, setCity] = useState(shippingInfo.city ? shippingInfo.city : "");
  const [phoneNo, setPhoneNo] = useState(
    shippingInfo.phoneNo ? shippingInfo.phoneNo : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingInfo.postalCode ? shippingInfo.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingInfo.country ? shippingInfo.country : ""
  );
  const countriesList = Object.values(countries);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      allActions.cartAcs.addShippingInfo({
        address,
        city,
        phoneNo,
        postalCode,
        country,
      })
    );
    navigate("/confirm-order");
  };

  return (
    <AccessPage roles={["admin", "user"]}>
      <MetaData title={"Shipping"} />
      <Header />
      <div className="row">
        <div className="col-lg-5 mx-auto my-3">
        <CheckoutStep shipping={true} />
          <form
            className="shadow-lg p-5"
            encType="multipart/form-data"
            onSubmit={onSubmitHandler}
          >
            <h1 className="mb-3">Shipping Info</h1>
            <FormInput
              label="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required={true}
            />
            <FormInput
              label="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required={true}
            />
            <FormInput
              label="Phone no"
              type="text"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required={true}
            />
            <FormInput
              label="Postal Code"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required={true}
            />
            <FormInput
              label="Country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required={true}
              select
            >
              {countriesList.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </FormInput>
            <Button type="submit" className="admin btn btn-block py-3 mb-2">
              COUNTINUE
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </AccessPage>
  );
};

export default Shipping;
