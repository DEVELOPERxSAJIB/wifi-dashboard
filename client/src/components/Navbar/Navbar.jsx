import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLoggedInUser } from "../../features/auth/authSlice";
import { IoReorderThreeOutline } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const Navbar = ({ toggleSidebar }) => {
  const { user } = useSelector(getLoggedInUser);

  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4">
            <i className="ti ti-menu-2 ti-sm" />
          </a>
        </div>
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <div className="navbar-nav gap-3 align-items-center">
            <div className="nav-item navbar-search-wrapper mb-0">
              <a className="nav-item nav-link search-toggler d-flex align-items-center px-0">
                <button
                  onClick={() => toggleSidebar()}
                  className="menu-toggle-button shawod-sm"
                >
                  <IoReorderThreeOutline size={26} />
                </button>
                <span className="d-none d-md-inline-block text-muted">
                  Hi {user?.name}, Welcome to dashboard
                </span>
              </a>
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Quick links  */}
            <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
              <a
                className="nav-link dropdown-toggle hide-arrow cursor-pointer"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <i className="ti ti-layout-grid-add ti-md" />
              </a>
              <div className="dropdown-menu dropdown-menu-end py-0">
                <div className="dropdown-menu-header border-bottom">
                  <div className="dropdown-header d-flex align-items-center py-3">
                    <h5 className="text-body mb-0 me-auto">Shortcuts</h5>
                    <a
                      className="dropdown-shortcuts-add text-body"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Add shortcuts"
                    >
                      <i className="ti ti-sm ti-apps" />
                    </a>
                  </div>
                </div>
                <div className="dropdown-shortcuts-list scrollable-container">
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-calendar fs-4" />
                      </span>
                      <a href="app-calendar.html" className="stretched-link">
                        Calendar
                      </a>
                      <small className="text-muted mb-0">Appointments</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-file-invoice fs-4" />
                      </span>
                      <a
                        href="app-invoice-list.html"
                        className="stretched-link"
                      >
                        Invoice App
                      </a>
                      <small className="text-muted mb-0">Manage Accounts</small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-users fs-4" />
                      </span>
                      <a href="app-user-list.html" className="stretched-link">
                        User App
                      </a>
                      <small className="text-muted mb-0">Manage Users</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-lock fs-4" />
                      </span>
                      <a
                        href="app-access-roles.html"
                        className="stretched-link"
                      >
                        Role Management
                      </a>
                      <small className="text-muted mb-0">Permission</small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-chart-bar fs-4" />
                      </span>
                      <a href="index.html" className="stretched-link">
                        Dashboard
                      </a>
                      <small className="text-muted mb-0">User Profile</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-settings fs-4" />
                      </span>
                      <a
                        href="pages-account-settings-account.html"
                        className="stretched-link"
                      >
                        Setting
                      </a>
                      <small className="text-muted mb-0">
                        Account Settings
                      </small>
                    </div>
                  </div>
                  <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-help fs-4" />
                      </span>
                      <a href="pages-faq.html" className="stretched-link">
                        FAQs
                      </a>
                      <small className="text-muted mb-0">
                        FAQs &amp; Articles
                      </small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                      <span className="dropdown-shortcuts-icon rounded-circle mb-2">
                        <i className="ti ti-square fs-4" />
                      </span>
                      <a href="modal-examples.html" className="stretched-link">
                        Modals
                      </a>
                      <small className="text-muted mb-0">Useful Popups</small>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/* Quick links */}
            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src={
                      user?.avatar?.url !== null
                        ? user?.avatar?.url
                        : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                    }
                    alt={"User Avatar"}
                    className="h-full rounded-circle"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    to={"/profile"}
                    className="dropdown-item"
                    href="pages-account-settings-account.html"
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src={
                              user?.avatar?.url !== null
                                ? user?.avatar?.url
                                : "https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
                            }
                            alt={"User Avatar"}
                            className="h-fill rounded-circle"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-medium d-block">{user?.name}</span>
                        <small className="text-muted">{user?.role}</small>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    to={"/profile"}
                    className="dropdown-item"
                    href="pages-profile-user.html"
                  >
                    <i className="ti ti-user-check me-2 ti-sm" />
                    <span className="align-middle">My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/settings"}
                    className="dropdown-item"
                    href="pages-account-settings-account.html"
                  >
                    <i className="ti ti-settings me-2 ti-sm" />
                    <span className="align-middle">Settings</span>
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="pages-account-settings-billing.html"
                  >
                    <span className="d-flex align-items-center align-middle">
                      <i className="flex-shrink-0 ti ti-credit-card me-2 ti-sm" />
                      <span className="flex-grow-1 align-middle">Billing</span>
                      <span className="flex-shrink-0 badge badge-center rounded-pill bg-label-danger w-px-20 h-px-20">
                        2
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="pages-faq.html">
                    <i className="ti ti-help me-2 ti-sm" />
                    <span className="align-middle">FAQ</span>
                  </a>
                </li>
                <li>
                  <Link className="dropdown-item" to="/packages">
                    <i className="ti ti-currency-dollar me-2 ti-sm" />
                    <span className="align-middle">Packages</span>
                  </Link>
                </li>
                <li>
                  <div className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    <i className="ti ti-logout me-2 ti-sm" />
                    <span className="align-middle">Log Out</span>
                  </Link>
                </li>
              </ul>
            </li>
            {/*/ User */}
          </ul>
        </div>

        {/* Search Small Screens */}
        <div className="navbar-search-wrapper search-input-wrapper d-none">
          <input
            type="text"
            className="form-control search-input container-xxl border-0"
            placeholder="Search..."
            aria-label="Search..."
          />
          <i className="ti ti-x ti-sm search-toggler cursor-pointer" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
