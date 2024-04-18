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
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="py-3 mb-4">
            <span className="text-muted fw-light">Account Settings /</span>
            Account
          </h4>
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-accoutn-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-accoutn"
                    type="button"
                    role="tab"
                    aria-controls="pills-accoutn"
                    aria-selected={activeTab === "pills-accoutn" ? true : false}
                    onClick={() => setActiveTab("pills-accoutn")}
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
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    <i className="ti ti-currency-dollar me-1 ti-xs"></i>Billing
                    & Plans
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
                  <div className="card mb-4">
                    <h5 className="card-header">Profile Details</h5>
                    {/* Account */}
                    <div className="card-body">
                      <div className="d-flex align-items-start align-items-sm-center gap-4">
                        <img
                          src="../../src/assets/img/avatars/14.png"
                          alt="user-avatar"
                          className="d-block w-px-100 h-px-100 rounded"
                          id="uploadedAvatar"
                        />
                        <div className="button-wrapper">
                          <label
                            htmlFor="upload"
                            className="btn btn-primary me-2 mb-3"
                            tabIndex={0}
                          >
                            <span className="d-none d-sm-block">
                              Upload new photo
                            </span>
                            <i className="ti ti-upload d-block d-sm-none" />
                            <input
                              type="file"
                              id="upload"
                              className="account-file-input"
                              hidden
                              accept="image/png, image/jpeg"
                            />
                          </label>
                          <button
                            type="button"
                            className="btn btn-label-secondary account-image-reset mb-3"
                          >
                            <i className="ti ti-refresh-dot d-block d-sm-none" />
                            <span className="d-none d-sm-block">Reset</span>
                          </button>
                          <div className="text-muted">
                            Allowed JPG, GIF or PNG. Max size of 800K
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                      <form id="formAccountSettings" method="GET">
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="firstName"
                              name="firstName"
                              defaultValue="John"
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="lastName"
                              id="lastName"
                              defaultValue="Doe"
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="email" className="form-label">
                              E-mail
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="email"
                              name="email"
                              defaultValue="john.doe@example.com"
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              Organization
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="organization"
                              name="organization"
                              defaultValue="Pixinvent"
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label" htmlFor="phoneNumber">
                              Phone Number
                            </label>
                            <div className="input-group input-group-merge">
                              <span className="input-group-text">US (+1)</span>
                              <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="form-control"
                                placeholder="202 555 0111"
                              />
                            </div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              placeholder="Address"
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="state" className="form-label">
                              State
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="state"
                              name="state"
                              placeholder="California"
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="zipCode" className="form-label">
                              Zip Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="zipCode"
                              name="zipCode"
                              placeholder={231465}
                              maxLength={6}
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label" htmlFor="country">
                              Country
                            </label>
                            <select
                              id="country"
                              className="select2 form-select"
                            >
                              <option value>Select</option>
                              <option value="Australia">Australia</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Brazil">Brazil</option>
                              <option value="Canada">Canada</option>
                              <option value="China">China</option>
                              <option value="France">France</option>
                              <option value="Germany">Germany</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Japan">Japan</option>
                              <option value="Korea">Korea, Republic of</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Philippines">Philippines</option>
                              <option value="Russia">Russian Federation</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Emirates">
                                United Arab Emirates
                              </option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="United States">
                                United States
                              </option>
                            </select>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="language" className="form-label">
                              Language
                            </label>
                            <select
                              id="language"
                              className="select2 form-select"
                            >
                              <option value>Select Language</option>
                              <option value="en">English</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                              <option value="pt">Portuguese</option>
                            </select>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="timeZones" className="form-label">
                              Timezone
                            </label>
                            <select
                              id="timeZones"
                              className="select2 form-select"
                            >
                              <option value>Select Timezone</option>
                              <option value={-12}>
                                (GMT-12:00) International Date Line West
                              </option>
                              <option value={-11}>
                                (GMT-11:00) Midway Island, Samoa
                              </option>
                              <option value={-10}>(GMT-10:00) Hawaii</option>
                              <option value={-9}>(GMT-09:00) Alaska</option>
                              <option value={-8}>
                                (GMT-08:00) Pacific Time (US &amp; Canada)
                              </option>
                              <option value={-8}>
                                (GMT-08:00) Tijuana, Baja California
                              </option>
                              <option value={-7}>(GMT-07:00) Arizona</option>
                              <option value={-7}>
                                (GMT-07:00) Chihuahua, La Paz, Mazatlan
                              </option>
                              <option value={-7}>
                                (GMT-07:00) Mountain Time (US &amp; Canada)
                              </option>
                              <option value={-6}>
                                (GMT-06:00) Central America
                              </option>
                              <option value={-6}>
                                (GMT-06:00) Central Time (US &amp; Canada)
                              </option>
                              <option value={-6}>
                                (GMT-06:00) Guadalajara, Mexico City, Monterrey
                              </option>
                              <option value={-6}>
                                (GMT-06:00) Saskatchewan
                              </option>
                              <option value={-5}>
                                (GMT-05:00) Bogota, Lima, Quito, Rio Branco
                              </option>
                              <option value={-5}>
                                (GMT-05:00) Eastern Time (US &amp; Canada)
                              </option>
                              <option value={-5}>
                                (GMT-05:00) Indiana (East)
                              </option>
                              <option value={-4}>
                                (GMT-04:00) Atlantic Time (Canada)
                              </option>
                              <option value={-4}>
                                (GMT-04:00) Caracas, La Paz
                              </option>
                            </select>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="currency" className="form-label">
                              Currency
                            </label>
                            <select
                              id="currency"
                              className="select2 form-select"
                            >
                              <option value>Select Currency</option>
                              <option value="usd">USD</option>
                              <option value="euro">Euro</option>
                              <option value="pound">Pound</option>
                              <option value="bitcoin">Bitcoin</option>
                            </select>
                          </div>
                        </div>
                        <div className="mt-2">
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
                      </form>
                    </div>
                    {/* /Account */}
                  </div>
                  <div className="card">
                    <h5 className="card-header">Delete Account</h5>
                    <div className="card-body">
                      <div className="mb-3 col-12 mb-0">
                        <div className="alert alert-warning">
                          <h5 className="alert-heading mb-1">
                            Are you sure you want to delete your account?
                          </h5>
                          <p className="mb-0">
                            Once you delete your account, there is no going
                            back. Please be certain.
                          </p>
                        </div>
                      </div>
                      <form id="formAccountDeactivation">
                        <div className="form-check mb-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="accountActivation"
                            id="accountActivation"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="accountActivation"
                          >
                            I confirm my account deactivation
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-danger deactivate-account"
                        >
                          Deactivate Account
                        </button>
                      </form>
                    </div>
                  </div>
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
