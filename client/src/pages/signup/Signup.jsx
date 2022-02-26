import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../../components/meta-data/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import allActions from "../../store/actions/index";
import FormInput from "../../components/ui/input/FormInput";
import Button from "../../components/ui/button/Button";
import Toast from "../../utils/Toast";

import "./Signup.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("/images/default_avatar.jpg");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { error, isCompleted } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const { username, email, password } = user;

  useEffect(() => {
    if (error) {
      setLoading(false);
      setErrors(error);
    }
    if (isCompleted) {
      setLoading(false);
      setErrors(null);
      setUser({
        username: "",
        email: "",
        password: "",
      });
      setIsSuccess(true);
      dispatch(allActions.userActs.clear());
    }
  }, [error, isCompleted, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    const formData = {
      username: username,
      email: email,
      password: password,
      avatar: {
        url: avatar,
      },
    };
    dispatch(allActions.userActs.signup(formData));
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const types = ["image/jpeg", "image/jpg", "image/png"];
      if (file) {
        if (file.size > 2000000) {
          Toast.error("File size is bigger than 2MB");
          return;
        } else if (!types.includes(file.type)) {
          Toast.error("File not image");
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const displayFormInput = () => {
    const types = ["email", "password"];
    const forms = ["username", "email", "password"];
    return forms.map((property, key) => {
      const type = types.includes(property) ? property : "text";
      return (
        <FormInput
          key={key}
          label={property}
          id={property + "_field"}
          type={type}
          name={property}
          value={user[property]}
          required={true}
          error={errors && errors[property] ? errors[property] : null}
          isInvalid={errors && errors[property]}
          onChange={onChangeHandler}
          disabled={loading}
        />
      );
    });
  };

  if (errors && errors.system) {
    Toast.error("Error system.Can't signup user!!");
  }

  return (
    <Fragment>
      <MetaData title={"Signup"} />
      <Header />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          {!isSuccess && (
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mb-3">Signup</h1>
              {displayFormInput()}
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="iamges/*"
                      onChange={onChangeHandler}
                      disabled={loading}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
              <Button
                id="register_button"
                type="submit"
                className="btn btn-block py-3 mb-2"
                disabled={loading}
              >
                {!loading && "SIGN UP"}
                {loading && (
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
              <Link to="/login">Have an account? Login.</Link>
            </form>
          )}
          {isSuccess && (
            <form
              className="shadow-lg text-center"
              onSubmit={submitHandler}
              encType="multipart/form-data"
              style={{ background: "#232f3e" }}
            >
              <div className="register-success-form">
                <img src="/images/shopit_logo.png" alt="logo" />
                <br />
                <img
                  className="register-success mt-2"
                  src="/images/order_success.png"
                  alt="success"
                />
                <h1 className="text-light mt-4">Signup Success!</h1>
                <p className="text-light">
                  We sent a token to verify your email.
                </p>
                <a className="btn" href="https://mail.google.com/">
                  CHECK EMAIL
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Register;
