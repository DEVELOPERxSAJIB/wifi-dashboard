import { Link } from "react-router-dom"

const Customer = () => {
  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row g-4 mb-4">
          <div className="d-flex justify-content-between">
          <h4 className="ms-1">
            <span className="text-muted fw-light"></span> All Customers
          </h4>
          <Link to={"/create-customer"} >
            
          <div className="btn btn-secondary add-new btn-primary waves-effect waves-light" tabIndex={0} aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser"><span><i className="ti ti-plus me-0 me-sm-1 ti-xs" /><span className="d-none d-sm-inline-block">Add Customer</span></span></div>
            </Link >


          </div>
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
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="content-left">
                    <span>Paid Users</span>
                    <div className="d-flex align-items-center my-2">
                      <h3 className="mb-0 me-2">4,567</h3>
                      <p className="text-success mb-0">(+18%)</p>
                    </div>
                    <p className="mb-0">Last week analytics</p>
                  </div>
                  <div className="avatar">
                    <span className="avatar-initial rounded bg-label-danger">
                      <i className="ti ti-user-plus ti-sm" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="content-left">
                    <span>Active Users</span>
                    <div className="d-flex align-items-center my-2">
                      <h3 className="mb-0 me-2">19,860</h3>
                      <p className="text-danger mb-0">(-14%)</p>
                    </div>
                    <p className="mb-0">Last week analytics</p>
                  </div>
                  <div className="avatar">
                    <span className="avatar-initial rounded bg-label-success">
                      <i className="ti ti-user-check ti-sm" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="content-left">
                    <span>Pending Users</span>
                    <div className="d-flex align-items-center my-2">
                      <h3 className="mb-0 me-2">237</h3>
                      <p className="text-success mb-0">(+42%)</p>
                    </div>
                    <p className="mb-0">Last week analytics</p>
                  </div>
                  <div className="avatar">
                    <span className="avatar-initial rounded bg-label-warning">
                      <i className="ti ti-user-exclamation ti-sm" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Customer List Table */}
        
          <div className="card">
            <h5 className="card-header">Table Caption</h5>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <caption className="ms-4">List of Projects</caption>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Users</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <i className="ti ti-brand-angular ti-lg text-danger me-3" />
                      <span className="fw-medium">Angular Project</span>
                    </td>
                    <td>Albert Cook</td>
                    <td>
                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Lilian Fuller"
                        >
                          <img
                            src="../../assets/img/avatars/5.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Sophia Wilkerson"
                        >
                          <img
                            src="../../assets/img/avatars/6.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Christina Parker"
                        >
                          <img
                            src="../../assets/img/avatars/7.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span className="badge bg-label-primary me-1">
                        Active
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical" />
                        </button>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-pencil me-1" /> Edit
                          </a>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-trash me-1" /> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="ti ti-brand-react-native ti-lg text-info me-3" />
                      <span className="fw-medium">React Project</span>
                    </td>
                    <td>Barry Hunter</td>
                    <td>
                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Lilian Fuller"
                        >
                          <img
                            src="../../assets/img/avatars/5.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Sophia Wilkerson"
                        >
                          <img
                            src="../../assets/img/avatars/6.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Christina Parker"
                        >
                          <img
                            src="../../assets/img/avatars/7.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span className="badge bg-label-success me-1">
                        Completed
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical" />
                        </button>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-pencil me-1" /> Edit
                          </a>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-trash me-1" /> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="ti ti-brand-vue ti-lg text-success me-3" />
                      <span className="fw-medium">VueJs Project</span>
                    </td>
                    <td>Trevor Baker</td>
                    <td>
                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Lilian Fuller"
                        >
                          <img
                            src="../../assets/img/avatars/5.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Sophia Wilkerson"
                        >
                          <img
                            src="../../assets/img/avatars/6.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Christina Parker"
                        >
                          <img
                            src="../../assets/img/avatars/7.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span className="badge bg-label-info me-1">
                        Scheduled
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical" />
                        </button>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-pencil me-1" /> Edit
                          </a>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-trash me-1" /> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i className="ti ti-brand-bootstrap ti-lg text-primary me-3" />
                      <span className="fw-medium">Bootstrap Project</span>
                    </td>
                    <td>Jerry Milton</td>
                    <td>
                      <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Lilian Fuller"
                        >
                          <img
                            src="../../assets/img/avatars/5.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Sophia Wilkerson"
                        >
                          <img
                            src="../../assets/img/avatars/6.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                        <li
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          className="avatar avatar-xs pull-up"
                          title="Christina Parker"
                        >
                          <img
                            src="../../assets/img/avatars/7.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </li>
                      </ul>
                    </td>
                    <td>
                      <span className="badge bg-label-warning me-1">
                        Pending
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn p-0 dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots-vertical" />
                        </button>
                        <div className="dropdown-menu">
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-pencil me-1" /> Edit
                          </a>
                          <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                          >
                            <i className="ti ti-trash me-1" /> Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
       
      </div>
    </>
  );
};

export default Customer;
