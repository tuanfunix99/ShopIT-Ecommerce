import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import MetaData from "../../components/meta-data/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FormInput from "../../components/ui/input/FormInput";
import Button from "../../components/ui/button/Button";
import Toast from "../../utils/Toast";
import allActions from "../../actions/index";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const { error, isCompleted } = useSelector((state) => state.user);

  const { email, password } = user;

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
      dispatch(allActions.userActs.clear());
      const origin = window.location.origin;
      window.location.replace(origin);
    }
  }, [error, isCompleted, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    const formData = {
      email: email,
      password: password,
    };
    dispatch(allActions.userActs.login(formData));
  };

  const onLoginGoogle = () => {
    const origin = window.location.origin;
    window.location.replace(origin + "/auth/google");
  };

  const onLoginFacebook = () =>{
    const origin = window.location.origin;
    window.location.replace(origin + "/auth/facebook");
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const displayFormInput = () => {
    const types = ["email", "password"];
    const forms = ["email", "password"];
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
      <Header />
      <Fragment>
        <MetaData title={"Login"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Login</h1>
              {displayFormInput()}
              <Link to="/password/forgot" className="mb-4">
                Forgot Password?
              </Link>
              <Button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                {!loading && "LOGIN"}
                {loading && (
                  <div>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    CHECKING...
                  </div>
                )}
              </Button>
              <h6 className="text-center my-2">OR</h6>
              <Button
                id="login_button"
                type="button"
                className="btn btn-block btn-google py-3 mb-2 mt-0"
                disabled={loading}
                onClick={onLoginGoogle}
              >
                <i className="fab fa-google"></i> GOOGLE
              </Button>
              <Button
                id="login_button"
                type="button"
                className="btn btn-block btn-facebook py-3 mb-2 mt-0"
                disabled={loading}
                onClick={onLoginFacebook}
              >
                <i class="fab fa-facebook"></i> FACEBOOK
              </Button>
              <Link to="/signup" className="mt-3 py-3">
                Don't have account? Create a new account.
              </Link>
            </form>
          </div>
        </div>
      </Fragment>
      <Footer />
    </Fragment>
  );
};

export default Login;
