import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../features/plan/planApiSlice";
import { gettingAllPlans } from "../../features/plan/planSlice";
import { createNewCustomer } from "../../features/customer/customerApiSlice";
import {
  gettingAllCustomers,
  setMessageEmpty,
} from "../../features/customer/customerSlice";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import { useNavigate } from "react-router-dom";
import MainLoader from "../../utils/Loaders/MainLoader";
import PageTitle from "../../components/PageTitle/PageTitle";

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countriesList = Object.values(countries);

  const { message, loader, error } = useSelector(gettingAllCustomers);
  const { plans } = useSelector(gettingAllPlans);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // remove avatart & avatar preview
  const handleRemovePreviewAvatar = () => {
    setAvatarPreview(null);
    setAvatar(null);
  };

  // get form data
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    package: "",
    remark: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [gender, setGender] = useState("");

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("name", input.name);
    form_data.append("email", input.email);
    form_data.append("mobile", input.mobile);
    form_data.append("package", input.package);
    form_data.append("remark", input.remark);
    form_data.append("street", input.street);
    form_data.append("city", input.city);
    form_data.append("postalCode", input.postalCode);
    form_data.append("country", input.country);
    form_data.append("gender", gender);

    if (avatar) {
      form_data.append("customerPicture", avatar);
    }

    dispatch(createNewCustomer(form_data));
  };

  useEffect(() => {
    dispatch(getAllPlans);
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty())
      navigate('/customers');
    }

    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty())
      
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
    <PageTitle title={"Add New Customer"} />
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <form onSubmit={handleSubmitForm}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div className="d-flex flex-column justify-content-center">
                <h4 className="py-3 mb-0">
                  <span className="text-muted fw-light">Customer /</span>
                  <span className="fw-medium"> Add customer</span>
                </h4>
              </div>
              <div className="d-flex align-content-center flex-wrap gap-3">
                <button type="submit" className="btn btn-primary">
                  Publish Profile
                </button>
              </div>
            </div>

            <div className="row">
              {/* First column*/}
              <div className="col-12 col-lg-8">
                {/* Profile Information */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-tile mb-0">Customer information</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="User name"
                        name="name"
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label" htmlFor="Email">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Email"
                          placeholder="Email"
                          name="email"
                          value={input.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col">
                        <label className="form-label" htmlFor="Mobile">
                          Mobile
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="Mobile"
                          placeholder="Phone Number"
                          name="mobile"
                          value={input.mobile}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label" htmlFor="Salary">
                          Package
                        </label>
                        <select
                          name="package"
                          value={input.package}
                          onChange={handleInputChange}
                          className="select2 form-select"
                        >
                          <option disabled value={""}>
                            - select a plan -
                          </option>
                          {plans?.map((plan) => (
                            <option key={plan._id} value={plan._id}>
                              {plan.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col">
                        <label className="form-label" htmlFor="Remark">
                          Remark
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="Remark"
                          placeholder="Nick Name"
                          name="remark"
                          value={input.remark}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Product Information */}
                {/* Avatar  & Gander */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Avatar & Gander</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Navigation */}
                      <div className="col-12 col-md-4 mx-auto card-separator">
                        <div className="d-flex justify-content-between flex-column mb-3 mb-md-0 pe-md-3">
                          <ul className="nav nav-align-left nav-pills flex-column">
                            <li className="nav-item">
                              <button
                                className="nav-link py-2 active"
                                data-bs-toggle="tab"
                                data-bs-target="#restock"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="ti ti-box me-2" />
                                <span className="align-middle">Avatar</span>
                              </button>
                            </li>
                            <li className="nav-item">
                              <button
                                className="nav-link py-2"
                                data-bs-toggle="tab"
                                data-bs-target="#shipping"
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="ti ti-car me-2" />
                                <span className="align-middle">Gander</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* /Navigation */}
                      {/* Options */}
                      <div className="col-12 col-md-8 pt-4 pt-md-0">
                        <div className="tab-content p-0 ps-md-3">
                          {/* Avatar Tab */}
                          <div
                            className="tab-pane fade show active"
                            id="restock"
                            role="tabpanel"
                          >
                            <div
                              style={
                                avatar
                                  ? { height: "auto" }
                                  : {
                                      height: "250px",
                                      borderRadius: "10px",
                                      background: "#F8F7FA",
                                    }
                              }
                              className="row d-flex border border-primary border-2 border-dashed justify-content-center align-items-center"
                            >
                              <div className="col-12 col-sm-9 text-center">
                                {avatar ? (
                                  <>
                                    <div className="position-relative avartar-preview-img">
                                      <span
                                        onClick={handleRemovePreviewAvatar}
                                        className="badge bg-danger cursor-pointer bg-glow image-remove-icon"
                                      >
                                        <IoTrash />
                                      </span>
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          padding: "5px 0",
                                        }}
                                        src={avatarPreview}
                                        alt=""
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <label
                                      htmlFor="fileInput"
                                      className="note needsclick btn bg-label-primary d-inline"
                                    >
                                      Browse image
                                      <input
                                        id="fileInput"
                                        type="file"
                                        className="d-none"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                      />
                                    </label>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Gander Tab */}
                          <div
                            className="tab-pane fade"
                            id="shipping"
                            role="tabpanel"
                          >
                            <div className="d-flex mb-4">
                              <h5 className="m-0">Select gander &nbsp;</h5>
                              <small className="badge rounded-2 badge-warning bg-label-warning fs-tiny border border-warning font-italic">
                                RECOMMENDED
                              </small>
                            </div>
                            <div>
                              <div className="form-check mb-1">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="male"
                                  value={"male"}
                                  checked={gender === "male"}
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="male"
                                >
                                  <span className="fw-medium d-block mb-1">
                                    Male
                                  </span>
                                </label>
                              </div>

                              <div className="form-check mb-1">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="female"
                                  value={"female"}
                                  checked={gender === "female"}
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="female"
                                >
                                  <span className="fw-medium d-block mb-1">
                                    Female
                                  </span>
                                </label>
                              </div>

                              <div className="form-check mb-5">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="others"
                                  value={"others"}
                                  checked={gender === "others"}
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="others"
                                >
                                  <span className="fw-medium d-block mb-1">
                                    Others
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /Options*/}
                    </div>
                  </div>
                </div>
                {/* Avatar  & Gander */}
              </div>
              {/* /Second column */}
              {/* Second column */}
              <div className="col-12 col-lg-4">
                {/* Address Card */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Address</h5>
                  </div>
                  <div className="card-body">
                    {/* Street */}
                    <div className="mb-3 col ecommerce-select2-dropdown">
                      <label className="form-label mb-1" htmlFor="street">
                        Street
                      </label>
                      <input
                        type="text"
                        id="street"
                        className="form-control"
                        placeholder="provide street name"
                        name="street"
                        value={input.street}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* City */}
                    <div className="mb-3 col ecommerce-select2-dropdown">
                      <label
                        className="form-label mb-1 d-flex justify-content-between align-items-center"
                        htmlFor="city"
                      >
                        <span>City</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="form-control"
                        placeholder="provide city name"
                        name="city"
                        value={input.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Zip Code */}
                    <div className="mb-3 col ecommerce-select2-dropdown">
                      <label className="form-label mb-1" htmlFor="zipcode">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipcode"
                        className="form-control"
                        placeholder="Zipcode of city"
                        name="postalCode"
                        value={input.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Country */}
                    <div className="mb-3 col ecommerce-select2-dropdown">
                      <label className="form-label mb-1" htmlFor="country">
                        Country
                      </label>
                      <select
                        id="country"
                        className="select2 form-select"
                        data-placeholder="Published"
                        name="country"
                        value={input.country}
                        onChange={handleInputChange}
                      >
                        <option disabled value={""}>
                          - select a country -
                        </option>
                        {countriesList &&
                          countriesList.map((country) => (
                            <option key={country.name} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* /Address Card */}
              </div>
              {/* /Second column */}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateCustomer;
