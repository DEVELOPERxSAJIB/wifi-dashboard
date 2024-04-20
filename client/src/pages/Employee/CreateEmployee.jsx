import { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { countries } from "countries-list";
import { Document, Page } from "react-pdf";

const CreateEmployee = () => {
  const countriesList = Object.values(countries);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const [documents, setDocuments] = useState([]);
  console.log(documents);

  const handleDocumentChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      console.log(files[1]);
      // files?.map((file) => setDocuments(file));
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

  const handleRemoveDocument = () => {};

  // const handleImageUrlInput = (event) => {
  //   setImageUrl(event.target.value);
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="app-ecommerce">
          {/* Add Product */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div className="d-flex flex-column justify-content-center">
              <h4 className="py-3 mb-0">
                <span className="text-muted fw-light">Employees /</span>
                <span className="fw-medium"> Add Employee</span>
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
                                name="gander"
                                id="male"
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
                                name="gander"
                                id="female"
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
                                name="gander"
                                id="others"
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
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 card-title">Documents</h5>
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
                          document > 0
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
                          {documents?.length > 0 ? (
                            <>
                              {documents.map((file, index) => (
                                <div
                                  key={index}
                                  className="position-relative avartar-preview-img"
                                >
                                  <span
                                    onClick={() => handleRemoveDocument(index)}
                                    className="badge bg-danger cursor-pointer bg-glow image-remove-icon"
                                  >
                                    <IoTrash />
                                  </span>
                                  {file.type === "application/pdf" ? (
                                    <div>
                                      <Document
                                        file={file}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                      >
                                        <Page pageNumber={pageNumber} />
                                      </Document>
                                      <p>
                                        Page {pageNumber} of {numPages}
                                      </p>
                                    </div>
                                  ) : (
                                    <img
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        padding: "5px 0",
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
                      type="number"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="cpassword">
                      Confirm password
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="cpassword"
                      placeholder="Confirm password"
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
                      defaultValue="Bangladesh"
                    >
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
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
