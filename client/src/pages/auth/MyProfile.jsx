import { useDispatch, useSelector } from "react-redux";
import { loggedinUserInfo } from "../../features/auth/authApiSlice";
import { getLoggedInUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import moment from "moment";
import { Document, Page } from "react-pdf";
import MainLoader from "../../utils/Loaders/MainLoader";
import PageTitle from "../../components/PageTitle/PageTitle";

const MyProfile = () => {
  const dispatch = useDispatch();

  const { user, loader } = useSelector(getLoggedInUser);

  const textStyle = {
    fontWeight: "bold",
    color: user?.isBan ? "red" : "green",
  };

  useEffect(() => {
    dispatch(loggedinUserInfo());
  }, [dispatch]);

  return (
    <>
      <PageTitle title={"My Profile"} />
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="py-3 mb-4">
            <span className="text-muted fw-light"></span> My Profile
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
                        user?.avatar.url !== null
                          ? user?.avatar?.url
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
                        <h4>{user?.name}</h4>
                        <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                          <li className="text-capitalize list-inline-item d-flex gap-1">
                            <i className="ti ti-color-swatch" />
                            {user?.role}
                          </li>
                          <li className="list-inline-item d-flex gap-1">
                            <i className="ti ti-map-pin" />{" "}
                            {user?.address?.city} City
                          </li>
                          <li className="list-inline-item d-flex gap-1">
                            <i className="ti ti-calendar" /> Joined{" "}
                            {moment(user?.createdAt).format("LL")}
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
              <ul className="nav nav-pills flex-column flex-sm-row mb-4">
                <li className="nav-item">
                  <a className="nav-link active" href="javascript:void(0);">
                    <i className="ti-xs ti ti-user-check me-1" /> Profile
                  </a>
                </li>
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
                      <span>{user?.name}</span>
                    </li>
                    {user?.remark && (
                      <li className="d-flex align-items-center mb-3">
                        <i className="ti ti-bookmark text-heading" />
                        <span className="fw-medium mx-2 text-heading">
                          Nick Name:
                        </span>
                        <span>{user?.remark}</span>
                      </li>
                    )}
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-check text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Status:
                      </span>
                      <span style={textStyle}>
                        {user?.isBan ? "Banned" : "Active"}
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-crown text-heading" />
                      <span className="fw-medium mx-2 text-heading">Role:</span>
                      <span className="text-capitalize fw-bold">
                        {user?.role}
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-reload text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Gender:
                      </span>
                      <span>{user?.gender}</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-target text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Salary:
                      </span>
                      <span>{user?.salary} BDT</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-location text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Address:
                      </span>
                      <span>
                        {user?.address?.street}, {user?.address?.city}
                      </span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-flag text-heading" />
                      <span className="fw-medium mx-2 text-heading">
                        Country:
                      </span>
                      <span>{user?.address?.country}</span>
                    </li>
                  </ul>
                  <small className="card-text text-uppercase">Contacts</small>
                  <ul className="list-unstyled mb-4 mt-3">
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-phone-call" />
                      <span className="fw-medium mx-2 text-heading">
                        Contact:
                      </span>
                      <span>{user?.mobile}</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i className="ti ti-mail" />
                      <span className="fw-medium mx-2 text-heading">
                        Email:
                      </span>
                      <span>{user?.email}</span>
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
                    {user?.documents && user?.documents?.length > 0 ? (
                      <div className="container">
                        <div className="intro">
                          <h2 className="text-center">Doc Preview</h2>
                        </div>
                        <div className="row photos">
                          {user?.documents?.map((item) => {
                            return (
                              <div
                                key={item?._id}
                                className="col-sm-6 col-md-4 col-lg-3 item"
                              >
                                {item?.url?.toLowerCase().endsWith(".pdf") ? (
                                  <>
                                    <div>
                                      <Document pdf={item?.url}>
                                        <Page pageNumber={1} />
                                      </Document>
                                    </div>
                                  </>
                                ) : (
                                  <a href={item?.url} data-lightbox="photos">
                                    <img
                                      className="img-fluid"
                                      src={item?.url}
                                      alt={item?.name}
                                    />
                                  </a>
                                )}
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

export default MyProfile;
