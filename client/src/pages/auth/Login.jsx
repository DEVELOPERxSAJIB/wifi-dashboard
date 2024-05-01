import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../features/auth/authApiSlice";
import {
  getLoggedInUser,
  setMessageEmpty,
} from "../../features/auth/authSlice";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import AuthLoader from "../../utils/Loaders/AuthLoader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated, user, message, error, loader } =
    useSelector(getLoggedInUser);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // get value from
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const data = { email: input.email, password: input.password };
    dispatch(authLogin(data));
  };

  useEffect(() => {
    if (user?.isBan) {
      navigate("/login");
    }

    if (user && isAuthenticated) {
      if (user.role === "admin") {
        navigate("/");
      } else {
        navigate("/packages");
      }
    }

    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }

  }, [dispatch, error, isAuthenticated, message, navigate, user]);

  return (
    <>
      {loader && <AuthLoader />}
      <div className="authentication-wrapper authentication-cover authentication-bg">
        <div className="authentication-inner row">
          {/* /Left Text */}
          <div className="d-none d-lg-flex col-lg-7 p-0">
            <div className="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
              <img
                src="../../src/assets/img/illustrations/auth-login-illustration-light.png"
                alt="auth-login-cover"
                className="img-fluid my-5 auth-illustration"
                data-app-light-img="illustrations/auth-login-illustration-light.png"
                data-app-dark-img="illustrations/auth-login-illustration-dark.html"
              />
              <img
                src="../../src/assets/img/illustrations/bg-shape-image-light.png"
                alt="auth-login-cover"
                className="platform-bg"
                data-app-light-img="illustrations/bg-shape-image-light.png"
                data-app-dark-img="illustrations/bg-shape-image-dark.html"
              />
            </div>
          </div>
          {/* /Left Text */}
          {/* Login */}
          <div className="d-flex col-12 col-lg-5 align-items-center p-sm-5 p-4">
            <div className="w-px-400 mx-auto">
              {/* Logo */}
              {/* <div className="app-brand mb-4">
                <a href="index.html" className="app-brand-link gap-2">
                  <span className="app-brand-logo demo">
                    
                  </span>
                </a>
              </div> */}
              {/* /Logo */}
              <h3 className="mb-1">Welcome to Penta Online!</h3>
              <p className="mb-4">
                Please sign-in to your account and start the adventure
              </p>
              <form onSubmit={handleSubmitForm} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email or username"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <Link to={"/forgot-password"}>
                      <small>Forgot Password?</small>
                    </Link>
                  </div>
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
                <button type="submit" className="btn btn-primary d-grid w-100">
                  Sign in
                </button>
              </form>
            </div>
          </div>
          {/* /Login */}
        </div>
      </div>
    </>
  );
};

export default Login;
