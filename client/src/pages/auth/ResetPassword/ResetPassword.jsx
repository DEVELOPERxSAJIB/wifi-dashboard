import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../features/auth/authApiSlice";
import { alertMessage } from "../../../utils/Alerts/alertMessage";
import {
  getLoggedInUser,
  setMessageEmpty,
} from "../../../features/auth/authSlice";
import AuthLoader from "../../../utils/Loaders/AuthLoader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const params = useParams();

  const { message, error, loader } = useSelector(getLoggedInUser);

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const data = {
      token: params?.token,
      password: input.password,
      confirmPassword: input.confirmPassword,
    };
    dispatch(resetPassword(data));
  };

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
      navigate("/login");
    }

    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
      {loader && <AuthLoader />}
      <div className="authentication-wrapper authentication-cover authentication-bg">
        <div className="authentication-inner row">
          {/* /Left Text */}
          <div className="d-none d-lg-flex col-lg-7 p-0">
            <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
              <img
                src="../../src/assets/img/illustrations/auth-reset-password-illustration-light.png"
                alt="auth-reset-password-cover"
                className="img-fluid my-5 auth-illustration"
                data-app-light-img="illustrations/auth-reset-password-illustration-light.png"
                data-app-dark-img="illustrations/auth-reset-password-illustration-dark.html"
              />
              <img
                src="../../src/assets/img/illustrations/bg-shape-image-light.png"
                alt="auth-reset-password-cover"
                className="platform-bg"
                data-app-light-img="illustrations/bg-shape-image-light.png"
                data-app-dark-img="illustrations/bg-shape-image-dark.html"
              />
            </div>
          </div>
          {/* /Left Text */}
          {/* Reset Password */}
          <div className="d-flex col-12 col-lg-5 align-items-center p-4 p-sm-5">
            <div className="w-px-400 mx-auto">
              {/* Logo */}
              <div className="app-brand mb-4"></div>
              {/* /Logo */}
              <h4 className="mb-1">Reset Password</h4>
              <form className="mb-3" onSubmit={handleSubmitForm}>
                <div className="mb-3 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    New Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      placeholder="············"
                      aria-describedby="password"
                      name="password"
                      value={input.password}
                      onChange={handleInputChange}
                    />
                    <span
                      onClick={handleShowPassword}
                      className="input-group-text cursor-pointer"
                    >
                      {showPassword ? (
                        <i className="ti ti-eye" />
                      ) : (
                        <i className="ti ti-eye-off" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-3 form-password-toggle">
                  <label className="form-label" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      className="form-control"
                      placeholder="············"
                      aria-describedby="password"
                      name="confirmPassword"
                      value={input.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <span
                      onClick={handleShowConfirmPassword}
                      className="input-group-text cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <i className="ti ti-eye" />
                      ) : (
                        <i className="ti ti-eye-off" />
                      )}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-grid w-100 mb-3"
                >
                  Set new password
                </button>
                <div className="text-center">
                  <Link to="/login">
                    <i className="ti ti-chevron-left scaleX-n1-rtl" />
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* /Reset Password */}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
