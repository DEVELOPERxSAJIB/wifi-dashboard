import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployee } from "../../features/employee/employeeSlice";
import { getAllEmployees } from "../../features/employee/employeeApiSlice";
import { getAllCustomer } from "../../features/customer/customerApiSlice";
import { gettingAllCustomers } from "../../features/customer/customerSlice";
import { Link } from "react-router-dom";
import { getLoggedInUser } from "../../features/auth/authSlice";
import PageTitle from "../../components/PageTitle/PageTitle";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector(fetchAllEmployee);
  const { customers } = useSelector(gettingAllCustomers);
  const { user } = useSelector(getLoggedInUser);

  const pendingEmployees = employees.filter(
    (employee) => employee.isActivate === false
  );
  const activateEmployee = employees.filter(
    (employee) => employee.isActivate === true
  );

  useEffect(() => {
    dispatch(getAllEmployees(user?.role));
    dispatch(getAllCustomer());
  }, [dispatch]);

  return (
    <>
      <PageTitle
        title={user?.role === "admin" ? "Admin Dashboard " : "Staff Dashboard "}
      />
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row g-4 mb-4">
          <div className="col-sm-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="content-left">
                    <span>Session</span>
                    <div className="d-flex align-items-center my-2">
                      <h3 className="mb-0 me-2">21,459</h3>
                      <p className="text-success mb-0">(+29%)</p>
                    </div>
                    <p className="mb-0">Total Users</p>
                  </div>
                  <div className="avatar">
                    <span className="avatar-initial rounded bg-label-primary">
                      <i className="ti ti-user ti-sm" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <Link to="/customers">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="content-left">
                      <span>Paid Customers</span>
                      <div className="d-flex align-items-center my-2">
                        <h3 className="mb-0 me-2">{customers?.length}</h3>
                        <p className="text-success mb-0"></p>
                      </div>
                      <p className="mb-0">See all customers</p>
                    </div>
                    <div className="avatar">
                      <span className="avatar-initial rounded bg-label-danger">
                        <i className="ti ti-user-plus ti-sm" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-6 col-xl-3">
            <Link to={"employees"}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="content-left">
                      <span>Active Staff</span>
                      <div className="d-flex align-items-center my-2">
                        <h3 className="mb-0 me-2">
                          {activateEmployee?.length}
                        </h3>
                        <p className="text-danger mb-0"></p>
                      </div>
                      <p className="mb-0">See all Employees</p>
                    </div>
                    <div className="avatar">
                      <span className="avatar-initial rounded bg-label-success">
                        <i className="ti ti-user-check ti-sm" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-6 col-xl-3">
            <Link to="/pending-employees">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="content-left">
                      <span>Pending Staff</span>
                      <div className="d-flex align-items-center my-2">
                        <h3 className="mb-0 me-2">
                          {pendingEmployees?.length}
                        </h3>
                        <p className="text-success mb-0"></p>
                      </div>
                      <p className="mb-0">Waiting for your approval</p>
                    </div>
                    <div className="avatar">
                      <span className="avatar-initial rounded bg-label-warning">
                        <i className="ti ti-user-exclamation ti-sm" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row">
          {/* Website Analytics */}
          <div className="col-lg-6 mb-4">
            <div
              className="swiper-container swiper-container-horizontal swiper swiper-card-advance-bg"
              id="swiper-with-pagination-cards"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="text-white mb-0 mt-2">
                        Website Analytics
                      </h5>
                      <small>Total 28.5% Conversion Rate</small>
                    </div>
                    <div className="row">
                      <div className="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                        <h6 className="text-white mt-0 mt-md-3 mb-3">
                          Traffic
                        </h6>
                        <div className="row">
                          <div className="col-6">
                            <ul className="list-unstyled mb-0">
                              <li className="d-flex mb-4 align-items-center">
                                <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                  28%
                                </p>
                                <p className="mb-0">Sessions</p>
                              </li>
                              <li className="d-flex align-items-center mb-2">
                                <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                  1.2k
                                </p>
                                <p className="mb-0">Leads</p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-6">
                            <ul className="list-unstyled mb-0">
                              <li className="d-flex mb-4 align-items-center">
                                <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                  3.1k
                                </p>
                                <p className="mb-0">Page Views</p>
                              </li>
                              <li className="d-flex align-items-center mb-2">
                                <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                  12%
                                </p>
                                <p className="mb-0">Conversions</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-4 my-md-0 text-center">
                        <img
                          src="../../../src/assets/img/illustrations/card-website-analytics-1.png"
                          alt="Website Analytics"
                          width={170}
                          className="card-website-analytics-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="text-white mb-0 mt-2">
                        Website Analytics
                      </h5>
                      <small>Total 28.5% Conversion Rate</small>
                    </div>
                    <div className="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                      <h6 className="text-white mt-0 mt-md-3 mb-3">Spending</h6>
                      <div className="row">
                        <div className="col-6">
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex mb-4 align-items-center">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                12h
                              </p>
                              <p className="mb-0">Spend</p>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                127
                              </p>
                              <p className="mb-0">Order</p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex mb-4 align-items-center">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                18
                              </p>
                              <p className="mb-0">Order Size</p>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                2.3k
                              </p>
                              <p className="mb-0">Items</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-4 my-md-0 text-center">
                      <img
                        src="../../assets/img/illustrations/card-website-analytics-2.png"
                        alt="Website Analytics"
                        width={170}
                        className="card-website-analytics-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="text-white mb-0 mt-2">
                        Website Analytics
                      </h5>
                      <small>Total 28.5% Conversion Rate</small>
                    </div>
                    <div className="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                      <h6 className="text-white mt-0 mt-md-3 mb-3">
                        Revenue Sources
                      </h6>
                      <div className="row">
                        <div className="col-6">
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex mb-4 align-items-center">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                268
                              </p>
                              <p className="mb-0">Direct</p>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                62
                              </p>
                              <p className="mb-0">Referral</p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-6">
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex mb-4 align-items-center">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                890
                              </p>
                              <p className="mb-0">Organic</p>
                            </li>
                            <li className="d-flex align-items-center mb-2">
                              <p className="mb-0 fw-medium me-2 website-analytics-text-bg">
                                1.2k
                              </p>
                              <p className="mb-0">Campaign</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-4 my-md-0 text-center">
                      <img
                        src="../../assets/img/illustrations/card-website-analytics-3.png"
                        alt="Website Analytics"
                        width={170}
                        className="card-website-analytics-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
          {/*/ Website Analytics */}
          {/* Sales Overview */}
          <div className="col-lg-3 col-sm-6 mb-4">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between">
                  <small className="d-block mb-1 text-muted">
                    Sales Overview
                  </small>
                  <p className="card-text text-success">+18.2%</p>
                </div>
                <h4 className="card-title mb-1">$42.5k</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <span className="badge bg-label-info p-1 rounded">
                        <i className="ti ti-shopping-cart ti-xs" />
                      </span>
                      <p className="mb-0">Order</p>
                    </div>
                    <h5 className="mb-0 pt-1 text-nowrap">62.2%</h5>
                    <small className="text-muted">6,440</small>
                  </div>
                  <div className="col-4">
                    <div className="divider divider-vertical">
                      <div className="divider-text">
                        <span className="badge-divider-bg bg-label-secondary">
                          VS
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="d-flex gap-2 justify-content-end align-items-center mb-2">
                      <p className="mb-0">Visits</p>
                      <span className="badge bg-label-primary p-1 rounded">
                        <i className="ti ti-link ti-xs" />
                      </span>
                    </div>
                    <h5 className="mb-0 pt-1 text-nowrap ms-lg-n3 ms-xl-0">
                      25.5%
                    </h5>
                    <small className="text-muted">12,749</small>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <div className="progress w-100" style={{ height: 8 }}>
                    <div
                      className="progress-bar bg-info"
                      style={{ width: "70%" }}
                      role="progressbar"
                      aria-valuenow={70}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "30%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ Sales Overview */}
          {/* Revenue Generated */}
          <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body pb-0">
                <div className="card-icon">
                  <span className="badge bg-label-success rounded-pill p-2">
                    <i className="ti ti-credit-card ti-sm" />
                  </span>
                </div>
                <h5 className="card-title mb-0 mt-2">97.5k</h5>
                <small>Revenue Generated</small>
              </div>
              <div id="revenueGenerated" />
            </div>
          </div>
          {/*/ Revenue Generated */}
          {/* Earning Reports */}
          <div className="col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-header pb-0 d-flex justify-content-between mb-lg-n4">
                <div className="card-title mb-0">
                  <h5 className="mb-0">Earning Reports</h5>
                  <small className="text-muted">Weekly Earnings Overview</small>
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="earningReportsId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ti ti-dots-vertical ti-sm text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="earningReportsId"
                  >
                    <a className="dropdown-item">
                      View More
                    </a>
                    <a className="dropdown-item">
                      Delete
                    </a>
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-4 d-flex flex-column align-self-end">
                    <div className="d-flex gap-2 align-items-center mb-2 pb-1 flex-wrap">
                      <h1 className="mb-0 py-5">$468</h1>
                      <div className="badge rounded bg-label-success">
                        +4.2%
                      </div>
                    </div>
                    <small>
                      You informed of this week compared to last week
                    </small>
                  </div>
                  <div className="col-12 col-md-8">
                    <div id="weeklyEarningReports" />
                  </div>
                </div>
                <div className="border rounded p-3 mt-4">
                  <div className="row gap-4 gap-sm-0">
                    <div className="col-12 col-sm-4">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="badge rounded bg-label-primary p-1">
                          <i className="ti ti-currency-dollar ti-sm" />
                        </div>
                        <h6 className="mb-0">Earnings</h6>
                      </div>
                      <h4 className="my-2 pt-1">$545.69</h4>
                      <div className="progress w-75" style={{ height: 4 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="badge rounded bg-label-info p-1">
                          <i className="ti ti-chart-pie-2 ti-sm" />
                        </div>
                        <h6 className="mb-0">Profit</h6>
                      </div>
                      <h4 className="my-2 pt-1">$256.34</h4>
                      <div className="progress w-75" style={{ height: 4 }}>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={50}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="badge rounded bg-label-danger p-1">
                          <i className="ti ti-brand-paypal ti-sm" />
                        </div>
                        <h6 className="mb-0">Expense</h6>
                      </div>
                      <h4 className="my-2 pt-1">$74.19</h4>
                      <div className="progress w-75" style={{ height: 4 }}>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "65%" }}
                          aria-valuenow={65}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ Earning Reports */}
          {/* Support Tracker */}
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between pb-0">
                <div className="card-title mb-0">
                  <h5 className="mb-0">Support Tracker</h5>
                  <small className="text-muted">Last 7 Days</small>
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="supportTrackerMenu"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ti ti-dots-vertical ti-sm text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="supportTrackerMenu"
                  >
                    <a className="dropdown-item" href="javascript:void(0);">
                      View More
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-12 col-lg-4">
                    <div className="mt-lg-4 mt-lg-2 mb-lg-4 mb-2 pt-1">
                      <h1 className="mb-0">164</h1>
                      <p className="mb-0">Total Tickets</p>
                    </div>
                    <ul className="p-0 m-0">
                      <li className="d-flex gap-3 align-items-center mb-lg-3 pt-2 pb-1">
                        <div className="badge rounded bg-label-primary p-1">
                          <i className="ti ti-ticket ti-sm" />
                        </div>
                        <div>
                          <h6 className="mb-0 text-nowrap">New Tickets</h6>
                          <small className="text-muted">142</small>
                        </div>
                      </li>
                      <li className="d-flex gap-3 align-items-center mb-lg-3 pb-1">
                        <div className="badge rounded bg-label-info p-1">
                          <i className="ti ti-circle-check ti-sm" />
                        </div>
                        <div>
                          <h6 className="mb-0 text-nowrap">Open Tickets</h6>
                          <small className="text-muted">28</small>
                        </div>
                      </li>
                      <li className="d-flex gap-3 align-items-center pb-1">
                        <div className="badge rounded bg-label-warning p-1">
                          <i className="ti ti-clock ti-sm" />
                        </div>
                        <div>
                          <h6 className="mb-0 text-nowrap">Response Time</h6>
                          <small className="text-muted">1 Day</small>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-12 col-sm-8 col-md-12 col-lg-8">
                    <div id="supportTracker" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ Support Tracker */}
          {/* Sales By Country */}
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between">
                <div className="card-title mb-0">
                  <h5 className="m-0 me-2">Sales by Countries</h5>
                  <small className="text-muted">Monthly Sales Overview</small>
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="salesByCountry"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ti ti-dots-vertical ti-sm text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="salesByCountry"
                  >
                    <a className="dropdown-item" href="javascript:void(0);">
                      Download
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      Refresh
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      Share
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul className="p-0 m-0">
                  <li className="d-flex align-items-center mb-4">
                    <div className="avatar flex-shrink-0 me-3">
                      <i className="fis fi fi-us rounded-circle fs-1" />
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-1">$8,567k</h6>
                        </div>
                        <small className="text-muted">United states</small>
                      </div>
                      <div className="user-progress">
                        <p className="text-success fw-medium mb-0 d-flex justify-content-center gap-1">
                          <i className="ti ti-chevron-up" />
                          25.8%
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <div className="avatar flex-shrink-0 me-3">
                      <i className="fis fi fi-br rounded-circle fs-1" />
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-1">$2,415k</h6>
                        </div>
                        <small className="text-muted">Brazil</small>
                      </div>
                      <div className="user-progress">
                        <p className="text-danger fw-medium mb-0 d-flex justify-content-center gap-1">
                          <i className="ti ti-chevron-down" />
                          6.2%
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <div className="avatar flex-shrink-0 me-3">
                      <i className="fis fi fi-in rounded-circle fs-1" />
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-1">$865k</h6>
                        </div>
                        <small className="text-muted">India</small>
                      </div>
                      <div className="user-progress">
                        <p className="text-success fw-medium mb-0 d-flex align-items-center gap-1">
                          <i className="ti ti-chevron-up" />
                          12.4%
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <div className="avatar flex-shrink-0 me-3">
                      <i className="fis fi fi-au rounded-circle fs-1" />
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-1">$745k</h6>
                        </div>
                        <small className="text-muted">Australia</small>
                      </div>
                      <div className="user-progress">
                        <p className="text-danger fw-medium mb-0 d-flex justify-content-center gap-1">
                          <i className="ti ti-chevron-down" />
                          11.9%
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex align-items-center mb-4">
                    <div className="avatar flex-shrink-0 me-3">
                      <i className="fis fi fi-us rounded-circle fs-1" />
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-1">$45</h6>
                        </div>
                        <small className="text-muted">France</small>
                      </div>
                      <div className="user-progress">
                        <p className="text-success fw-medium mb-0 d-flex justify-content-center gap-1">
                          <i className="ti ti-chevron-up" />
                          16.2%
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="avatar flex-shrink-0 me-3">
                      <i className="fis fi fi-cn rounded-circle fs-1" />
                    </div>
                    <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                      <div className="me-2">
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 me-1">$12k</h6>
                        </div>
                        <small className="text-muted">China</small>
                      </div>
                      <div className="user-progress">
                        <p className="text-success fw-medium mb-0 d-flex justify-content-center gap-1">
                          <i className="ti ti-chevron-up" />
                          14.8%
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*/ Sales By Country */}
          {/* Total Earning */}
          <div className="col-12 col-xl-4 mb-4 col-md-6">
            <div className="card">
              <div className="card-header d-flex justify-content-between pb-1">
                <h5 className="mb-0 card-title">Total Earning</h5>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="totalEarning"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ti ti-dots-vertical ti-sm text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="totalEarning"
                  >
                    <a className="dropdown-item" href="javascript:void(0);">
                      View More
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <h1 className="mb-0 me-2">87%</h1>
                  <i className="ti ti-chevron-up text-success me-1" />
                  <p className="text-success mb-0">25.8%</p>
                </div>
                <div id="totalEarningChart" />
                <div className="d-flex align-items-start my-4">
                  <div className="badge rounded bg-label-primary p-2 me-3 rounded">
                    <i className="ti ti-currency-dollar ti-sm" />
                  </div>
                  <div className="d-flex justify-content-between w-100 gap-2 align-items-center">
                    <div className="me-2">
                      <h6 className="mb-0">Total Sales</h6>
                      <small className="text-muted">Refund</small>
                    </div>
                    <p className="mb-0 text-success">+$98</p>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div className="badge rounded bg-label-secondary p-2 me-3 rounded">
                    <i className="ti ti-brand-paypal ti-sm" />
                  </div>
                  <div className="d-flex justify-content-between w-100 gap-2 align-items-center">
                    <div className="me-2">
                      <h6 className="mb-0">Total Revenue</h6>
                      <small className="text-muted">Client Payment</small>
                    </div>
                    <p className="mb-0 text-success">+$126</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*/ Total Earning */}
          {/* Monthly Campaign State */}
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between">
                <div className="card-title mb-0">
                  <h5 className="mb-0">Monthly Campaign State</h5>
                  <small className="text-muted">8.52k Social Visiters</small>
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="MonthlyCampaign"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ti ti-dots-vertical ti-sm text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="MonthlyCampaign"
                  >
                    <a className="dropdown-item" href="javascript:void(0);">
                      Refresh
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      Download
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul className="p-0 m-0">
                  <li className="mb-4 pb-1 d-flex justify-content-between align-items-center">
                    <div className="badge bg-label-success rounded p-2">
                      <i className="ti ti-mail ti-sm" />
                    </div>
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                      <h6 className="mb-0 ms-3">Emails</h6>
                      <div className="d-flex">
                        <p className="mb-0 fw-medium">12,346</p>
                        <p className="ms-3 text-success mb-0">0.3%</p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4 pb-1 d-flex justify-content-between align-items-center">
                    <div className="badge bg-label-info rounded p-2">
                      <i className="ti ti-link ti-sm" />
                    </div>
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                      <h6 className="mb-0 ms-3">Opened</h6>
                      <div className="d-flex">
                        <p className="mb-0 fw-medium">8,734</p>
                        <p className="ms-3 text-success mb-0">2.1%</p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4 pb-1 d-flex justify-content-between align-items-center">
                    <div className="badge bg-label-warning rounded p-2">
                      <i className="ti ti-click ti-sm" />
                    </div>
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                      <h6 className="mb-0 ms-3">Clicked</h6>
                      <div className="d-flex">
                        <p className="mb-0 fw-medium">967</p>
                        <p className="ms-3 text-success mb-0">1.4%</p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4 pb-1 d-flex justify-content-between align-items-center">
                    <div className="badge bg-label-primary rounded p-2">
                      <i className="ti ti-users ti-sm" />
                    </div>
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                      <h6 className="mb-0 ms-3">Subscribe</h6>
                      <div className="d-flex">
                        <p className="mb-0 fw-medium">345</p>
                        <p className="ms-3 text-success mb-0">8.5k</p>
                      </div>
                    </div>
                  </li>
                  <li className="mb-4 pb-1 d-flex justify-content-between align-items-center">
                    <div className="badge bg-label-secondary rounded p-2">
                      <i className="ti ti-alert-triangle ti-sm text-body" />
                    </div>
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                      <h6 className="mb-0 ms-3">Complaints</h6>
                      <div className="d-flex">
                        <p className="mb-0 fw-medium">10</p>
                        <p className="ms-3 text-success mb-0">1.5%</p>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between align-items-center">
                    <div className="badge bg-label-danger rounded p-2">
                      <i className="ti ti-ban ti-sm" />
                    </div>
                    <div className="d-flex justify-content-between w-100 flex-wrap">
                      <h6 className="mb-0 ms-3">Unsubscribe</h6>
                      <div className="d-flex">
                        <p className="mb-0 fw-medium">86</p>
                        <p className="ms-3 text-success mb-0">0.8%</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*/ Monthly Campaign State */}
          {/* Source Visit */}
          <div className="col-xl-4 col-md-6 order-2 order-lg-1 mb-4">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="card-title mb-0">
                  <h5 className="mb-0">Source Visits</h5>
                  <small className="text-muted">38.4k Visitors</small>
                </div>
                <div className="dropdown">
                  <button
                    className="btn p-0"
                    type="button"
                    id="sourceVisits"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ti ti-dots-vertical ti-sm text-muted" />
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="sourceVisits"
                  >
                    <a className="dropdown-item" href="javascript:void(0);">
                      Refresh
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      Download
                    </a>
                    <a className="dropdown-item" href="javascript:void(0);">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="mb-3 pb-1">
                    <div className="d-flex align-items-start">
                      <div className="badge bg-label-secondary p-2 me-3 rounded">
                        <i className="ti ti-shadow ti-sm" />
                      </div>
                      <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Direct Source</h6>
                          <small className="text-muted">
                            Direct link click
                          </small>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0">1.2k</p>
                          <div className="ms-3 badge bg-label-success">
                            +4.2%
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3 pb-1">
                    <div className="d-flex align-items-start">
                      <div className="badge bg-label-secondary p-2 me-3 rounded">
                        <i className="ti ti-globe ti-sm" />
                      </div>
                      <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Social Network</h6>
                          <small className="text-muted">Social Channels</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0">31.5k</p>
                          <div className="ms-3 badge bg-label-success">
                            +8.2%
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3 pb-1">
                    <div className="d-flex align-items-start">
                      <div className="badge bg-label-secondary p-2 me-3 rounded">
                        <i className="ti ti-mail ti-sm" />
                      </div>
                      <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Email Newsletter</h6>
                          <small className="text-muted">Mail Campaigns</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0">893</p>
                          <div className="ms-3 badge bg-label-success">
                            +2.4%
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3 pb-1">
                    <div className="d-flex align-items-start">
                      <div className="badge bg-label-secondary p-2 me-3 rounded">
                        <i className="ti ti-external-link ti-sm" />
                      </div>
                      <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Referrals</h6>
                          <small className="text-muted">
                            Impact Radius Visits
                          </small>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0">342</p>
                          <div className="ms-3 badge bg-label-danger">
                            -0.4%
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-3 pb-1">
                    <div className="d-flex align-items-start">
                      <div className="badge bg-label-secondary p-2 me-3 rounded">
                        <i className="ti ti-discount-2 ti-sm" />
                      </div>
                      <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">ADVT</h6>
                          <small className="text-muted">Google ADVT</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0">2.15k</p>
                          <div className="ms-3 badge bg-label-success">
                            +9.1%
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="mb-2">
                    <div className="d-flex align-items-start">
                      <div className="badge bg-label-secondary p-2 me-3 rounded">
                        <i className="ti ti-star ti-sm" />
                      </div>
                      <div className="d-flex justify-content-between w-100 flex-wrap gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Other</h6>
                          <small className="text-muted">Many Sources</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0">12.5k</p>
                          <div className="ms-3 badge bg-label-success">
                            +6.2%
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*/ Source Visit */}
          {/* Projects table */}
          <div className="col-12 col-xl-8 col-sm-12 order-1 order-lg-2 mb-4 mb-lg-0">
            <div className="card">
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
          </div>
          {/*/ Projects table */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
