import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
  setMessageEmpty,
} from "../../../features/auth/authSlice";
import { countries } from "countries-list";
import { updateAuthUser } from "../../../features/auth/authApiSlice";
import { alertMessage } from "../../../utils/Alerts/alertMessage";

const Update = () => {
  const dispatch = useDispatch();
  const countriesList = Object.values(countries);

  const { user, loader, message, error } = useSelector(getLoggedInUser);

  const [input, setInput] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
    street: user?.address?.street,
    city: user?.address?.city,
    postalCode: user?.address?.postalCode,
    country: user?.address?.country,
    gender: user?.gender,
  });

  const [avatar, setAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarInput = (e) => {
    setAvatar(e.target.files[0]);
    setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("name", input.name);
    form_data.append("email", input.email);
    form_data.append("mobile", input.mobile);
    form_data.append("gender", input.gender);
    form_data.append("street", input.street);
    form_data.append("city", input.city);
    form_data.append("postalCode", input.postalCode);
    form_data.append("country", input.country);

    if (avatar) {
      form_data.append("userAvatar", avatar);
    }

    dispatch(updateAuthUser(form_data));
  };

  const handleResetForm = () => {
    setInput({
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
      street: user?.address?.street,
      city: user?.address?.city,
      postalCode: user?.address?.postalCode,
      country: user?.address?.country,
      gender: user?.gender,
    });

    setAvatar(null);
    setPreviewAvatar(null);
  };

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }
    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <div className="card mb-4">
        <h5 className="card-header">Profile Details</h5>

        <div className="card-body">
          <div className="d-flex align-items-start align-items-sm-center gap-4">
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="user-avatar"
                className="d-block w-px-100 h-px-100 rounded"
                id="uploadedAvatar"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={
                  avatar
                    ? avatar
                    : user?.avatar?.url ||
                      "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                }
                alt="user-avatar"
                className="d-block w-px-100 h-px-100 rounded"
                id="uploadedAvatar"
                style={{ objectFit: "cover" }}
              />
            )}

            <div className="button-wrapper">
              <label
                htmlFor="upload"
                className="btn btn-primary me-2 mb-3"
                tabIndex={0}
              >
                <span className="d-none d-sm-block">Upload new photo</span>
                <i className="ti ti-upload d-block d-sm-none" />
                <input
                  type="file"
                  id="upload"
                  className="account-file-input"
                  hidden
                  onChange={handleAvatarInput}
                />
              </label>
              <button
                onClick={handleResetForm}
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
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="firstName" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="firstName"
                  placeholder="Enter your name"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
                <input
                  disabled
                  className="form-control"
                  type="text"
                  id="email"
                  placeholder="Enter your e-mail address"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="organization" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  id="organization"
                  className="form-control"
                  placeholder="Enter you mobie number"
                  name="mobile"
                  value={input.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="organization" className="form-label">
                  Gender
                </label>
                <select
                  id="organization"
                  className="select2 form-select"
                  name="gender"
                  value={input.gender}
                  onChange={handleInputChange}
                >
                  <option disabled value="undifined">
                    undifined
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="street" className="form-label">
                  Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder="Enter your address"
                  name="street"
                  value={input.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="state" className="form-label">
                  City
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="state"
                  placeholder="Enter your city"
                  name="city"
                  value={input.city}
                  onChange={handleInputChange}
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
                  name="postalCode"
                  value={input.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label" htmlFor="country">
                  Country
                </label>

                <select
                  className="select2 form-select"
                  name="country"
                  id="country"
                  value={input.country}
                  onChange={handleInputChange}
                >
                  <option disabled value={""}>
                    - select a country -
                  </option>
                  {countriesList.map((data) => {
                    return (
                      <>
                        <option key={data.name} value={data.name}>
                          {data.name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mt-2">
              <button type="submit" className="btn btn-primary me-2">
                Save changes
              </button>
              <button
                onClick={handleResetForm}
                className="btn btn-label-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete user account details  */}
      {/* <div className="card">
        <h5 className="card-header">Delete Account</h5>
        <div className="card-body">
          <div className="mb-3 col-12 mb-0">
            <div className="alert alert-warning">
              <h5 className="alert-heading mb-1">
                Are you sure you want to delete your account?
              </h5>
              <p className="mb-0">
                Once you delete your account, there is no going back. Please be
                certain.
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
              <label className="form-check-label" htmlFor="accountActivation">
                I confirm my account deactivation
              </label>
            </div>
            <button type="submit" className="btn btn-danger deactivate-account">
              Deactivate Account
            </button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Update;
