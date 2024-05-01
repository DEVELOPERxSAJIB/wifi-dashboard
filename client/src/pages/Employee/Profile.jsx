import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  banEmployee,
  getAllEmployees,
} from "../../features/employee/employeeApiSlice";
import { useEffect, useState } from "react";
import {
  fetchAllEmployee,
  setMessageEmpty,
} from "../../features/employee/employeeSlice";
import MainLoader from "../../utils/Loaders/MainLoader";
import moment from "moment";
// import { Document, Page } from "react-pdf";
import { FaBan } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import Swal from "sweetalert2";
import { getLoggedInUser } from "../../features/auth/authSlice";
import PageTitle from "../../components/PageTitle/PageTitle";
import { FaDownload } from "react-icons/fa";
import fileDownload from "js-file-download";

const Profile = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { employees, error, message, loader } = useSelector(fetchAllEmployee);
  const { user } = useSelector(getLoggedInUser);

  // get single user data
  const [singleEmployee, setSingleEmployee] = useState(null);

  useEffect(() => {
    const employee = employees.filter((data) => data?._id === id);
    setSingleEmployee(employee[0]);
  }, [employees, id]);

  const textStyle = {
    fontWeight: "bold",
    color: singleEmployee?.isBan ? "red" : "green",
  };

  const handleBanStaff = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#685DD8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(banEmployee(id));
      }
    });
  };

  //  downlaod doc
  const downloadFileURL = (url) => {

    fileDownload('https://res.cloudinary.com/djdkjrlp8/image/upload/v1714475035/v3kzhxu8lqxdljwarlkz.jpg', url);

    // const filename = url;
    // const aTag = document.createElement("a");
    // aTag.href = url;
    // aTag.setAttribute("download", filename);
    // document.body.appendChild(aTag);
    // aTag.click();
    // aTag.remove();
  };

  useEffect(() => {
    dispatch(getAllEmployees(user?.role));
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }
    if (error) {
      alertMessage({ type: "error", message: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <PageTitle title={`Profile @${singleEmployee?.name}`} />
      {!singleEmployee || loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="py-3 mb-4">
            <span className="text-muted fw-light">Employee /</span> Profile
          </h4>
          {/* Header */}
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="user-profile-header-banner">
                  <img
                    src="../../src/assets/img/pages/profile-banner.png"
                    alt="Banner image"
                    className="rounded-top w-100"
                  />
                </div>
                <div className="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4">
                  <div className="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
                    <img
                      src={
                        singleEmployee?.avatar?.url !== null
                          ? singleEmployee?.avatar?.url
                          : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                      }
                      alt="user image"
                      className="d-block ms-0 ms-sm-4 rounded shadow-sm user-profile-img"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="flex-grow-1 mt-sm-3">
                    <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                      <div className="user-profile-info">
                        <h4>{singleEmployee?.name}</h4>
                        <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                          <li className="text-capitalize list-inline-item d-flex gap-1">
                            <i className="ti ti-color-swatch" />
                            {singleEmployee?.role}
                          </li>
                          <li className="list-inline-item d-flex gap-1">
                            <i className="ti ti-map-pin" />{" "}
                            {singleEmployee?.address?.city} City
                          </li>
                          <li className="list-inline-item d-flex gap-1">
                            <i className="ti ti-calendar" /> Joined{" "}
                            {moment(singleEmployee?.createdAt).format("LL")}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ Header */}
          {/* Navbar pills */}
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills gap-2 flex-column flex-sm-row mb-4">
                <li className="nav-item">
                  <a className="nav-link active">
                    <i className="ti-xs ti ti-user-check me-1" /> Profile
                  </a>
                </li>

                {user?.role === "admin" && (
                  <>
                    {singleEmployee?.isBan ? (
                      <li className="nav-item">
                        <button
                          onClick={handleBanStaff}
                          className="btn btn-success d-flex gap-2"
                        >
                          <FiCheckCircle />
                          <span>Unban</span>
                        </button>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <button
                          onClick={handleBanStaff}
                          className="btn btn-danger d-flex gap-2"
                        >
                          <FaBan />
                          <span>Ban</span>
                        </button>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
          {/*/ Navbar pills */}
          {/* User Profile Content */}
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-5">
              {/* About User */}
              <div className="card mb-4">
                <div className="card-body">
                  <small className="card-text text-uppercase">About</small>
                  <ul className="list-unstyled mb-4 mt-3">
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-user text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Full Name:
                      </span>
                      <span>{singleEmployee?.name}</span>
                    </li>
                    {singleEmployee?.remark && (
                      <li className="d-flex align-items-center mb-3">
                        <i className="ti ti-bookmark text-heading" />
                        <span className="fw-medium mx-2 text-heading">
                          Nick Name:
                        </span>
                        <span>{singleEmployee?.remark}</span>
                      </li>
                    )}
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-check text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Status:
                      </span>
                      <span style={textStyle}>
                        {singleEmployee?.isBan ? "Banned" : "Active"}
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-crown text-heading" />
                      <span className="fw-medium mx-2 text-heading">Role:</span>
                      <span className="text-capitalize fw-bold">
                        {singleEmployee?.role}
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-reload text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Gender:
                      </span>
                      <span>{singleEmployee?.gender}</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-target text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Salary:
                      </span>
                      <span>{singleEmployee?.salary} BDT</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-location text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Address:
                      </span>
                      <span>
                        {singleEmployee?.address?.street},{" "}
                        {singleEmployee?.address?.city}
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-flag text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Country:
                      </span>
                      <span>{singleEmployee?.address?.country}</span>
                    </li>
                  </ul>
                  <small className="card-text text-uppercase">Contacts</small>
                  <ul className="list-unstyled mb-4 mt-3">
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-phone-call" />
                      <span className="fw-medium mx-2 text-heading">
                        Contact:
                      </span>
                      <span>{singleEmployee?.mobile}</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-mail" />
                      <span className="fw-medium mx-2 text-heading">
                        Email:
                      </span>
                      <span>{singleEmployee?.email}</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/*/ About User */}
            </div>
            <div className="col-xl-8 col-lg-7 col-md-7">
              {/* Activity Timeline */}
              <div className="card card-action mb-4">
                <div className="card-header align-items-center">
                  <h5 className="card-action-title mb-0">User Documents</h5>
                </div>
                <div className="card-body pb-0">
                  <div className="photo-gallery">
                    {singleEmployee?.documents &&
                    singleEmployee?.documents?.length > 0 ? (
                      <div className="container">
                        <div className="intro">
                          <h2 className="text-center">Doc Preview</h2>
                        </div>
                        <div className="row photos">
                          {singleEmployee?.documents?.map((item) => {
                            return (
                              <div
                                key={item?._id}
                                className="col-sm-6 col-md-4 col-lg-3 item"
                              >
                                <div style={{ position: "relative" }}>
                                  {/* <a
                                    href={item?.url}
                                    target="_blank"
                                    data-lightbox="photos"
                                  > */}
                                  <img
                                    className="img-fluid"
                                    src={item?.url}
                                    alt={"Staffs Doc"}
                                  />
                                  {/* </a> */}
                                  {/* Download button */}
                                  <button
                                    onClick={() => downloadFileURL(item?.url)}
                                    style={{
                                      position: "absolute",
                                      bottom: "5px",
                                      right: "5px",
                                      borderRadius: "5px",
                                      padding: "10px 12px",
                                      background: "#00a8ff",
                                      color: "#fff",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <FaDownload />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="container my-5 pb-5">
                        <div className="col-lg mb-md-0">
                          <div className="card border-primary border border-2 shadow-none">
                            <div className="card-body text-center position-relative">
                              <h4 className="m-0 text-primary">
                                No Documents found
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/*/ Activity Timeline */}
            </div>
          </div>
          {/*/ User Profile Content */}
        </div>
      )}
    </>
  );
};

export default Profile;
