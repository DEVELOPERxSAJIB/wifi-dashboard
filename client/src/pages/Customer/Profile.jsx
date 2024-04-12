const Profile = () => {
  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 mb-4">
          <span className="text-muted fw-light">User Profile /</span> Profile
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
                    src="../../src/assets/img/avatars/14.png"
                    alt="user image"
                    className="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"
                  />
                </div>
                <div className="flex-grow-1 mt-sm-3">
                  <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                    <div className="user-profile-info">
                      <h4>John Doe</h4>
                      <ul className="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                        <li className="list-inline-item d-flex gap-1">
                          <i className="ti ti-color-swatch" /> UX Designer
                        </li>
                        <li className="list-inline-item d-flex gap-1">
                          <i className="ti ti-map-pin" /> Vatican City
                        </li>
                        <li className="list-inline-item d-flex gap-1">
                          <i className="ti ti-calendar" /> Joined April 2021
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
              <li className="nav-item">
                <a className="nav-link" href="pages-profile-teams.html">
                  <i className="ti-xs ti ti-users me-1" /> Teams
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages-profile-projects.html">
                  <i className="ti-xs ti ti-layout-grid me-1" />
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages-profile-connections.html">
                  <i className="ti-xs ti ti-link me-1" /> Connections
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
                    <span>John Doe</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-check text-heading" />
                    <span className="fw-medium mx-2 text-heading">Status:</span>
                    <span>Active</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-crown text-heading" />
                    <span className="fw-medium mx-2 text-heading">Role:</span>
                    <span>Developer</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-flag text-heading" />
                    <span className="fw-medium mx-2 text-heading">
                      Country:
                    </span>
                    <span>USA</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-file-description text-heading" />
                    <span className="fw-medium mx-2 text-heading">
                      Languages:
                    </span>
                    <span>English</span>
                  </li>
                </ul>
                <small className="card-text text-uppercase">Contacts</small>
                <ul className="list-unstyled mb-4 mt-3">
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-phone-call" />
                    <span className="fw-medium mx-2 text-heading">
                      Contact:
                    </span>
                    <span>(123) 456-7890</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-brand-skype" />
                    <span className="fw-medium mx-2 text-heading">Skype:</span>
                    <span>john.doe</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-mail" />
                    <span className="fw-medium mx-2 text-heading">Email:</span>
                    <span>john.doe@example.com</span>
                  </li>
                </ul>
                <small className="card-text text-uppercase">Teams</small>
                <ul className="list-unstyled mb-0 mt-3">
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-brand-angular text-danger me-2" />
                    <div className="d-flex flex-wrap">
                      <span className="fw-medium me-2 text-heading">
                        Backend Developer
                      </span>
                      <span>(126 Members)</span>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="ti ti-brand-react-native text-info me-2" />
                    <div className="d-flex flex-wrap">
                      <span className="fw-medium me-2 text-heading">
                        React Developer
                      </span>
                      <span>(98 Members)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/*/ About User */}
            {/* Profile Overview */}
            <div className="card mb-4">
              <div className="card-body">
                <p className="card-text text-uppercase">Overview</p>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-check" />
                    <span className="fw-medium mx-2">Task Compiled:</span>
                    <span>13.5k</span>
                  </li>
                  <li className="d-flex align-items-center mb-3">
                    <i className="ti ti-layout-grid" />
                    <span className="fw-medium mx-2">Projects Compiled:</span>
                    <span>146</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="ti ti-users" />
                    <span className="fw-medium mx-2">Connections:</span>
                    <span>897</span>
                  </li>
                </ul>
              </div>
            </div>
            {/*/ Profile Overview */}
          </div>
          <div className="col-xl-8 col-lg-7 col-md-7">
            {/* Activity Timeline */}
            <div className="card card-action mb-4">
              <div className="card-header align-items-center">
                <h5 className="card-action-title mb-0">Activity Timeline</h5>
                <div className="card-action-element">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn dropdown-toggle hide-arrow p-0"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="ti ti-dots-vertical text-muted" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Share timeline
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Suggest edits
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="javascript:void(0);">
                          Report bug
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body pb-0">
                <ul className="timeline ms-1 mb-0">
                  <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary" />
                    <div className="timeline-event">
                      <div className="timeline-header">
                        <h6 className="mb-0">Client Meeting</h6>
                        <small className="text-muted">Today</small>
                      </div>
                      <p className="mb-2">Project meeting with john @10:15am</p>
                      <div className="d-flex flex-wrap">
                        <div className="avatar me-2">
                          <img
                            src="../../assets/img/avatars/3.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="ms-1">
                          <h6 className="mb-0">Lester McCarthy (Client)</h6>
                          <span>CEO of Infibeam</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-success" />
                    <div className="timeline-event">
                      <div className="timeline-header">
                        <h6 className="mb-0">
                          Create a new project for client
                        </h6>
                        <small className="text-muted">2 Day Ago</small>
                      </div>
                      <p className="mb-0">Add files to new design folder</p>
                    </div>
                  </li>
                  <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-danger" />
                    <div className="timeline-event">
                      <div className="timeline-header">
                        <h6 className="mb-0">Shared 2 New Project Files</h6>
                        <small className="text-muted">6 Day Ago</small>
                      </div>
                      <p className="mb-2">
                        Sent by Mollie Dixon
                        <img
                          src="../../assets/img/avatars/4.png"
                          className="rounded-circle me-3"
                          alt="avatar"
                          height={24}
                          width={24}
                        />
                      </p>
                      <div className="d-flex flex-wrap gap-2 pt-1">
                        <a href="javascript:void(0)" className="me-3">
                          <img
                            src="../../assets/img/icons/misc/doc.png"
                            alt="Document image"
                            width={15}
                            className="me-2"
                          />
                          <span className="fw-medium text-heading">
                            App Guidelines
                          </span>
                        </a>
                        <a href="javascript:void(0)">
                          <img
                            src="../../assets/img/icons/misc/xls.png"
                            alt="Excel image"
                            width={15}
                            className="me-2"
                          />
                          <span className="fw-medium text-heading">
                            Testing Results
                          </span>
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item timeline-item-transparent border-transparent">
                    <span className="timeline-point timeline-point-info" />
                    <div className="timeline-event">
                      <div className="timeline-header">
                        <h6 className="mb-0">Project status updated</h6>
                        <small className="text-muted">10 Day Ago</small>
                      </div>
                      <p className="mb-0">Woocommerce iOS App Completed</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/*/ Activity Timeline */}
            <div className="row">
              {/* Connections */}
              <div className="col-lg-12 col-xl-6">
                <div className="card card-action mb-4">
                  <div className="card-header align-items-center">
                    <h5 className="card-action-title mb-0">Connections</h5>
                    <div className="card-action-element">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical text-muted" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Share connections
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Suggest edits
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Report bug
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-3">
                        <div className="d-flex align-items-start">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/avatars/2.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Cecilia Payne</h6>
                              <small className="text-muted">
                                45 Connections
                              </small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <button className="btn btn-label-primary btn-icon btn-sm">
                              <i className="ti ti-user-check ti-xs" />
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-start">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/avatars/3.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Curtis Fletcher</h6>
                              <small className="text-muted">
                                1.32k Connections
                              </small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <button className="btn btn-primary btn-icon btn-sm">
                              <i className="ti ti-user-x ti-xs" />
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-start">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/avatars/10.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Alice Stone</h6>
                              <small className="text-muted">
                                125 Connections
                              </small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <button className="btn btn-primary btn-icon btn-sm">
                              <i className="ti ti-user-x ti-xs" />
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-start">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/avatars/7.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Darrell Barnes</h6>
                              <small className="text-muted">
                                456 Connections
                              </small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <button className="btn btn-label-primary btn-icon btn-sm">
                              <i className="ti ti-user-check ti-xs" />
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-start">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/avatars/12.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Eugenia Moore</h6>
                              <small className="text-muted">
                                1.2k Connections
                              </small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <button className="btn btn-label-primary btn-icon btn-sm">
                              <i className="ti ti-user-check ti-xs" />
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="text-center">
                        <a href="javascript:;">View all connections</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*/ Connections */}
              {/* Teams */}
              <div className="col-lg-12 col-xl-6">
                <div className="card card-action mb-4">
                  <div className="card-header align-items-center">
                    <h5 className="card-action-title mb-0">Teams</h5>
                    <div className="card-action-element">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical text-muted" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Share teams
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Suggest edits
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="javascript:void(0);"
                            >
                              Report bug
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/icons/brands/react-label.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">React Developers</h6>
                              <small className="text-muted">72 Members</small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:;">
                              <span className="badge bg-label-danger">
                                Developer
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/icons/brands/support-label.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Support Team</h6>
                              <small className="text-muted">122 Members</small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:;">
                              <span className="badge bg-label-primary">
                                Support
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/icons/brands/figma-label.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">UI Designers</h6>
                              <small className="text-muted">7 Members</small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:;">
                              <span className="badge bg-label-info">
                                Designer
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/icons/brands/vue-label.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Vue.js Developers</h6>
                              <small className="text-muted">289 Members</small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:;">
                              <span className="badge bg-label-danger">
                                Developer
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-start">
                            <div className="avatar me-2">
                              <img
                                src="../../assets/img/icons/brands/twitter-label.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="me-2 ms-1">
                              <h6 className="mb-0">Digital Marketing</h6>
                              <small className="text-muted">24 Members</small>
                            </div>
                          </div>
                          <div className="ms-auto">
                            <a href="javascript:;">
                              <span className="badge bg-label-secondary">
                                Marketing
                              </span>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="text-center">
                        <a href="javascript:;">View all teams</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*/ Teams */}
            </div>
            {/* Projects table */}
            <div className="card mb-4">
              <div className="card-datatable table-responsive">
                <table className="datatables-projects table border-top">
                  <thead>
                    <tr>
                      <th />
                      <th />
                      <th>Name</th>
                      <th>Leader</th>
                      <th>Team</th>
                      <th className="w-px-200">Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            {/*/ Projects table */}
          </div>
        </div>
        {/*/ User Profile Content */}
      </div>
    </>
  );
};

export default Profile;
