import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { countries } from "countries-list";
import { Document, Page } from "react-pdf";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllEmployees,
  updateEmployee,
} from "../../features/employee/employeeApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEmployee,
  setMessageEmpty,
} from "../../features/employee/employeeSlice";
import PageTitle from "../../components/PageTitle/PageTitle";
import MainLoader from "../../utils/Loaders/MainLoader";
import { getLoggedInUser } from "../../features/auth/authSlice";

const UpdateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countriesList = Object.values(countries);
  const { id } = useParams();

  const { employees, loader, message, error } = useSelector(fetchAllEmployee);
  const { user } = useSelector(getLoggedInUser);

  // find single employee
  const [employee, setEmployee] = useState();
  useEffect(() => {
    if (employees && employees?.length > 0) {
      const data = employees.find((data) => data?._id === id);
      setEmployee(data);
    }
  }, [employees, id]);

  const [avatar, setAvatar] = useState({
    public_id: employee?.avatar?.public_id,
    url: employee?.avatar?.url,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const [documents, setDocuments] = useState(employee?.documents);

  const handleDocumentChange = (e) => {
    const files = e.target.files;

    if (files?.length > 5) {
      alertMessage({
        type: "warning",
        message: "You can only upload a maximum of 5 documents",
      });
      const firstFiveFile = Array.from(files).slice(0, 5);
      setDocuments(firstFiveFile);
      return;
    }

    if (files?.length > 0) {
      setDocuments([...files]);
    }
  };

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // remove avatart & avatar preview
  const handleRemovePreviewAvatar = () => {
    setAvatarPreview(null);
    setAvatar(null);
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
  };

  const [input, setInput] = useState({
    name: "",
    role: "",
    email: "",
    mobile: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    salary: "",
    remark: "",
    password: "",
    confirmPassword: "",
  });
  const [gender, setGender] = useState("");
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // update form submit
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("name", input.name);
    form_data.append("role", input.role);
    form_data.append("email", input.email);
    form_data.append("mobile", input.mobile);
    form_data.append("street", input.street);
    form_data.append("city", input.city);
    form_data.append("postalCode", input.postalCode);
    form_data.append("country", input.country);
    form_data.append("salary", input.salary);
    form_data.append("remark", input.remark);
    form_data.append("password", input.password);
    form_data.append("confirmPassword", input.confirmPassword);
    form_data.append("gender", gender);

    if (avatar) {
      form_data.append("userAvatar", avatar);
    }

    if (documents?.length > 0) {
      documents?.forEach((doc) => {
        form_data.append("userDocuments", doc);
      });
    }

    dispatch(updateEmployee({ id: id, data: form_data }));
  };

  useEffect(() => {
    dispatch(getAllEmployees(user?.role));
  }, [dispatch, user]);

  useEffect(() => {
    setInput({
      name: employee?.name,
      role: employee?.role,
      email: employee?.email,
      mobile: employee?.mobile,
      street: employee?.address?.street,
      city: employee?.address?.city,
      postalCode: employee?.address?.postalCode,
      country: employee?.address?.country || "",
      salary: employee?.salary,
      remark: employee?.remark,
    });

    if (employee?.avatar?.url) {
      setAvatar({ url: employee?.avatar?.url });
      setAvatarPreview(employee?.avatar?.url);
    }

    if (employee) {
      setGender(employee?.gender || "");
    }
  }, [employee]);

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      setInput({
        name: "",
        role: "",
        email: "",
        mobile: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        salary: "",
        remark: "",
        password: "",
        confirmPassword: "",
      });
      dispatch(setMessageEmpty());
      setDocuments(null)
    }
    if (error) {
      alertMessage({ type: "error", message: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
      <PageTitle title={`Update Profile @${employee?.name}`} />
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="app-ecommerce">
            <form onSubmit={handleSubmitForm}>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                <div className="d-flex flex-column justify-content-center">
                  <h4 className="py-3 mb-0">
                    <span className="text-muted fw-light">Employees /</span>
                    <span className="fw-medium"> Update Employee</span>
                  </h4>
                </div>
                <div className="d-flex align-content-center flex-wrap gap-3">
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </div>
              </div>
              <div className="row">
                {/* First column*/}
                <div className="col-12 col-lg-8">
                  {/* Profile Information */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-tile mb-0">User information</h5>
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
                      <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                          Role
                        </label>
                        <select
                          name="role"
                          value={input.role}
                          onChange={handleInputChange}
                          className="select-2 form-select"
                        >
                          <option value="Hello">Select</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                        </select>
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
                            Salary
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="Salary"
                            placeholder="Monthly salary"
                            name="salary"
                            value={input.salary}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col">
                          <label className="form-label" htmlFor="Remark">
                            Remark
                          </label>
                          <input
                            type="text"
                            className="form-control"
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
                  {/* Documents */}

                  {/* Show Previous Documetns */}
                  {employee?.documents?.length > 0 && (
                    <div className="container my-5">
                      <div className="intro">
                        <h5 className="text-center">
                          {employee?.name} Documents
                        </h5>
                      </div>
                      <div className="row photos">
                        {employee?.documents?.map((item) => {
                          return (
                            <div
                              key={item?._id}
                              style={{ background: "#7367F0" }}
                              className="col-sm-12 col-md-4 col-lg-4 item p-2 border border-2 border-solid"
                            >
                              <div style={{ position: "relative" }}>
                                <a
                                  href={item?.url}
                                  target="_blank"
                                  data-lightbox="photos"
                                >
                                  <img
                                    className="img-fluid"
                                    src={item?.url}
                                    alt={"Staffs Doc"}
                                  />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 card-title">Documents</h5>
                      {documents?.length > 0 && (
                        <h5 className="mb-0 text-danger card-title">
                          * New Documents will replace with old documents
                        </h5>
                      )}
                    </div>
                    <div className="card-body">
                      <div className="dropzone needsclick" id="dropzone-basic">
                        <div
                          className="tab-pane fade show active"
                          id="restock"
                          role="tabpanel"
                        >
                          <div
                            style={
                              documents?.length > 0
                                ? { height: "auto", overflowY: "scroll" }
                                : {
                                    height: "250px",
                                    borderRadius: "10px",
                                    background: "#F8F7FA",
                                    overflowY: "scroll",
                                  }
                            }
                            className="row d-flex border border-primary border-2 border-dashed justify-content-center align-items-center"
                          >
                            <div
                              style={{
                                overflowY: "scroll",
                              }}
                              className="col-12 col-sm-9 text-center"
                            >
                              {documents?.length > 0 ? (
                                <>
                                  {documents.map((file, index) => (
                                    <div
                                      key={index}
                                      className="position-relative document-preview-img"
                                    >
                                      <span
                                        onClick={() =>
                                          handleRemoveDocument(index)
                                        }
                                        className="badge bg-danger cursor-pointer bg-glow image-remove-icon"
                                      >
                                        <IoTrash />
                                      </span>
                                      {file.type === "application/pdf" ? (
                                        <div className="pdf-div">
                                          <Document
                                            file={file}
                                            onLoadSuccess={
                                              onDocumentLoadSuccess
                                            }
                                          >
                                            <Page pageNumber={pageNumber} />
                                          </Document>
                                        </div>
                                      ) : (
                                        <img
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                          src={URL.createObjectURL(file)}
                                          alt=""
                                        />
                                      )}
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <label htmlFor="fileInput">
                                  <input
                                    className="note needsclick btn bg-label-primary d-inline"
                                    id="fileInput"
                                    multiple
                                    type="file"
                                    accept="image/*, .pdf"
                                    onChange={handleDocumentChange}
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Documents */}
                </div>
                {/* /Second column */}
                {/* Second column */}
                <div className="col-12 col-lg-4">
                  {/* password Card */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Security</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                          Create a password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={input.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="cpassword">
                          Confirm password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cpassword"
                          placeholder="Confirm password"
                          name="confirmPassword"
                          value={input.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* Charge tax check box */}

                      {/* Instock switch */}
                      <div className="d-flex justify-content-between align-items-center border-top pt-3">
                        <h6 className="mb-0">
                          Password should at least 6 character long
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* /password Card */}
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
        </div>
      )}
    </>
  );
};

export default UpdateEmployee;
