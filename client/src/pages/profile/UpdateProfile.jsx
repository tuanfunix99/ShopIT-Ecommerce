import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../../components/meta-data/MetaData";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../store/actions/index";
import FormInput from "../../components/ui/input/FormInput";
import Button from "../../components/ui/button/Button";
import Toast from "../../utils/Toast";
import Header from "../../components/header/Header";
import AccessPage from "../../components/access/AccessPage";
import Footer from "../../components/footer/Footer";

const UpdateProfile = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { user, error, isCompleted } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && !username && !email && !avatar) {
      setAvatar(user.avatar.url);
      setUsername(user.username);
      setEmail(user.email);
    }
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
  }, [user, error, isCompleted, dispatch, username, email, avatar]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);
    const formData = {
      id: user ? user._id : "",
      username: username,
      email: email,
      avatar: {
        url: avatar,
        public_id: user ? user.avatar.public_id : null,
      },
    };
    dispatch(allActions.userActs.updateProfile(formData));
  };

  const onChangeHandler = (e) => {
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
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (errors && errors.system) {
    Toast.error("Error system.Can't signup user!!");
  }

  return (
    <Fragment>
      <Header />
      <AccessPage roles={["user", "admin"]}>
        <MetaData title={"Update Profile"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mt-2 mb-5">Update Profile</h1>

              <FormInput
                label="username"
                id={"username_field"}
                type="text"
                name="username"
                value={username ? username : ""}
                required={true}
                error={errors && errors.username ? errors.username : null}
                isInvalid={errors && errors.username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />

              {user && !user.passportId && (
                <FormInput
                  label="email"
                  id={"email_field"}
                  type="email"
                  name="email"
                  value={email ? email : ""}
                  required={true}
                  error={errors && errors.email ? errors.email : null}
                  isInvalid={errors && errors.email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              )}

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatar ? avatar : "/images/default_avatar.jpg"}
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
                      accept="image/*"
                      onChange={onChangeHandler}
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
                {!loading && "UPDATE"}
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

export default UpdateProfile;
