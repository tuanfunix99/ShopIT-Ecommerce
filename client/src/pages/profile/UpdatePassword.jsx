import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../../components/meta-data/MetaData";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/ui/input/FormInput";
import Button from "../../components/ui/button/Button";
import Toast from "../../utils/Toast";
import allActions from "../../store/actions/index";
import AccessPage from "../../components/access/AccessPage";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { error, isCompleted, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      setLoading(false);
      setErrors(error);
    }
    if (isCompleted) {
      setLoading(false);
      setErrors(null);
      dispatch(allActions.userActs.clear());
      const origin = window.location.origin;
      window.location.replace(origin + "/me");
    }
  }, [user, error, isCompleted, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    const formData = {
      id: user ? user._id : "",
      password,
      oldPassword,
    };
    dispatch(allActions.userActs.changePassword(formData));
  };

  if (errors && errors.system) {
    Toast.error("Error system.Can't signup user!!");
  }

  return (
    <Fragment>
      <AccessPage
        passportId={user && user.passportId}
        roles={["user", "admin"]}
      >
        <Header />
        <MetaData title={"Change Password"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mt-2 mb-5">Update Password</h1>
              <FormInput
                label="old password"
                id={"oldPassword_field"}
                type="password"
                name="oldPassword"
                value={oldPassword ? oldPassword : ""}
                required={true}
                error={errors && errors.oldPassword ? errors.oldPassword : null}
                isInvalid={errors && errors.oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={loading}
              />
              <FormInput
                label="password"
                id={"password_field"}
                type="password"
                name="password"
                value={password ? password : ""}
                required={true}
                error={errors && errors.password ? errors.password : null}
                isInvalid={errors && errors.password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                id="register_button"
                type="submit"
                className="btn btn-block py-3 mb-2"
                disabled={loading}
              >
                {!loading && "CHANGE"}
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
            </form>
          </div>
        </div>
        <Footer />
      </AccessPage>
    </Fragment>
  );
};

export default UpdatePassword;
