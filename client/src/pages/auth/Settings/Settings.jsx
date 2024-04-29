import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getLoggedInUser,
  setMessageEmpty,
} from "../../../features/auth/authSlice";
import { alertMessage } from "../../../utils/Alerts/alertMessage";
import MainLoader from "../../../utils/Loaders/MainLoader";
import { updatePassword } from "../../../features/auth/authApiSlice";
import Update from "./Update";
import PageTitle from "../../../components/PageTitle/PageTitle";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, message, error, loader } =
    useSelector(getLoggedInUser);

  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleShowOldPassword = () => {
    setShow({ ...show, oldPassword: !show.oldPassword });
  };
  const handleShowNewPassword = () => {
    setShow({ ...show, newPassword: !show.newPassword });
  };
  const handleShowConfirmNewPassword = () => {
    setShow({ ...show, confirmNewPassword: !show.confirmNewPassword });
  };

  // get form data
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // replace name with value
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
      confirmNewPassword: input.confirmNewPassword,
    };

    dispatch(updatePassword(data));
  };

  const [activeTab, setActiveTab] = useState("pills-account");

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/login");
    }

    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }

    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, isAuthenticated, message, navigate, user]);

  return (
    <>
      <PageTitle
        title={activeTab === "pills-account" ? "Account Settings" : "Account Security"}
      />
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="py-3 mb-4">
            <span className="text-muted fw-light">Account Settings /</span>
            {activeTab === "pills-account" && " Account"}
            {activeTab === "pills-security" && " Security"}
          </h4>
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-account-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-account"
                    type="button"
                    role="tab"
                    aria-controls="pills-account"
                    aria-selected={activeTab === "pills-account" ? true : false}
                    onClick={() => setActiveTab("pills-account")}
                  >
                    <i className="ti ti-user-check ti-xs me-1" />
                    Account
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-security-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-security"
                    type="button"
                    role="tab"
                    aria-controls="pills-security"
                    aria-selected={
                      activeTab === "pills-security" ? true : false
                    }
                    onClick={() => setActiveTab("pills-security")}
                  >
                    <i className="ti ti-lock ti-xs me-1" />
                    Security
                  </button>
                </li>
              </ul>

              {/* Tab Data */}
              <div className="tab-content" id="pills-tabContent">
                {/* First Tab */}
                <div
                  className={`tab-pane fade ${
                    activeTab === "pills-account" ? "show active" : ""
                  }`}
                  id="pills-accoutn"
                  role="tabpanel"
                  aria-labelledby="pills-accoutn-tab"
                >
                  <Update />
                </div>

                {/* Second Tab */}
                <div
                  className={`tab-pane fade ${
                    activeTab === "pills-security" ? "show active" : ""
                  }`}
                  id="pills-security"
                  role="tabpanel"
                  aria-labelledby="pills-security-tab"
                >
                  <h4 className="py-3 mb-4">
                    <span className="text-muted fw-light">
                      Account Settings /
                    </span>
                    Security
                  </h4>
                  <div className="row">
                    <div className="col-md-12">
                      {/* Change Password */}
                      <div className="card mb-4">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                          <form onSubmit={handleFormSubmit}>
                            <div className="row">
                              <div className="mb-3 col-md-6 form-password-toggle">
                                <label
                                  className="form-label"
                                  htmlFor="currentPassword"
                                >
                                  Current Password
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    className="form-control"
                                    type={
                                      show.oldPassword ? "text" : "password"
                                    }
                                    id="currentPassword"
                                    placeholder="············"
                                    name="oldPassword"
                                    value={input.oldPassword}
                                    onChange={handleInputChange}
                                  />
                                  <span
                                    onClick={handleShowOldPassword}
                                    className="input-group-text cursor-pointer"
                                  >
                                    {show.oldPassword ? (
                                      <i className="ti ti-eye" />
                                    ) : (
                                      <i className="ti ti-eye-off" />
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="mb-3 col-md-6 form-password-toggle">
                                <label
                                  className="form-label"
                                  htmlFor="newPassword"
                                >
                                  New Password
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    className="form-control"
                                    type={
                                      show.newPassword ? "text" : "password"
                                    }
                                    id="newPassword"
                                    placeholder="············"
                                    name="newPassword"
                                    value={input.newPassword}
                                    onChange={handleInputChange}
                                  />
                                  <span
                                    onClick={handleShowNewPassword}
                                    className="input-group-text cursor-pointer"
                                  >
                                    {show.newPassword ? (
                                      <i className="ti ti-eye" />
                                    ) : (
                                      <i className="ti ti-eye-off" />
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="mb-3 col-md-6 form-password-toggle">
                                <label
                                  className="form-label"
                                  htmlFor="confirmPassword"
                                >
                                  Confirm New Password
                                </label>
                                <div className="input-group input-group-merge">
                                  <input
                                    className="form-control"
                                    type={
                                      show.confirmNewPassword
                                        ? "text"
                                        : "password"
                                    }
                                    id="confirmPassword"
                                    placeholder="············"
                                    name="confirmNewPassword"
                                    value={input.confirmNewPassword}
                                    onChange={handleInputChange}
                                  />
                                  <span
                                    onClick={handleShowConfirmNewPassword}
                                    className="input-group-text cursor-pointer"
                                  >
                                    {show.confirmNewPassword ? (
                                      <i className="ti ti-eye" />
                                    ) : (
                                      <i className="ti ti-eye-off" />
                                    )}
                                  </span>
                                </div>
                              </div>
                              <div className="col-12 mb-4">
                                <h6>Password Requirements:</h6>
                                <ul className="ps-3 mb-0">
                                  <li className="mb-1">
                                    Minimum 8 characters long - the more, the
                                    better
                                  </li>
                                  <li className="mb-1">
                                    At least one lowercase character
                                  </li>
                                  <li>
                                    At least one number, symbol, or whitespace
                                    character
                                  </li>
                                </ul>
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  className="btn btn-primary me-2"
                                >
                                  Save changes
                                </button>
                                <button
                                  type="reset"
                                  className="btn btn-label-secondary"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/*/ Change Password */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
