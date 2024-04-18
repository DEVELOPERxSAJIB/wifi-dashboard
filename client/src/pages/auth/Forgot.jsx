import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import {
  getLoggedInUser,
  setMessageEmpty,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthLoader from "../../utils/Loaders/AuthLoader";
import { forgotPasswordReq } from "../../features/auth/authApiSlice";

const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error, loader } =
    useSelector(getLoggedInUser);

  // get value from
  const [email, setEmail] = useState("");

  // submit with email
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordReq(email));
  };

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
      setEmail("")
    }

    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="authentication-wrapper authentication-cover authentication-bg">
      {loader && <AuthLoader />}
      <div className="authentication-inner row">
        {/* /Left Text */}
        <div className="d-none d-lg-flex col-lg-7 p-0">
          <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
            <img
              src="../../src/assets/img/illustrations/auth-forgot-password-illustration-light.png"
              alt="auth-forgot-password-cover"
              className="img-fluid my-5 auth-illustration"
              data-app-light-img="illustrations/auth-forgot-password-illustration-light.png"
              data-app-dark-img="illustrations/auth-forgot-password-illustration-dark.html"
            />
            <img
              src="../../src/assets/img/illustrations/bg-shape-image-light.png"
              alt="auth-forgot-password-cover"
              className="platform-bg"
              data-app-light-img="illustrations/bg-shape-image-light.png"
              data-app-dark-img="illustrations/bg-shape-image-dark.html"
            />
          </div>
        </div>
        {/* /Left Text */}
        {/* Forgot Password */}
        <div className="d-flex col-12 col-lg-5 align-items-center p-sm-5 p-4">
          <div className="w-px-400 mx-auto">
            <h3 className="mb-1">Forgot Password?</h3>
            <p className="mb-4">
              Enter your email and we will send you instructions to reset your
              password
            </p>
            <form onSubmit={handleSubmitForm} className="mb-3">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary d-grid w-100">
                Send Reset Link
              </button>
            </form>
            <div className="text-center">
              <Link
                to={"/login"}
                className="d-flex align-items-center justify-content-center"
              >
                <i className="ti ti-chevron-left scaleX-n1-rtl" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
        {/* /Forgot Password */}
      </div>
    </div>
  );
};

export default Forgot;
