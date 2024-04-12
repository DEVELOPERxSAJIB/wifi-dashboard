const Sidebar = () => {
  return (
    <div className="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
    
            <div className="card mb-4">
              <div className="card-body">
                <div className="user-avatar-section">
                  <div className="d-flex align-items-center flex-column">
                    <img
                      className="img-fluid rounded mb-3 pt-1 mt-4"
                      src="../../src/assets/img/avatars/15.png"
                      height={100}
                      width={100}
                      alt="User avatar"
                    />
                    <div className="user-info text-center">
                      <h4 className="mb-2">Violet Mendoza</h4>
                      <span className="badge bg-label-secondary mt-1">
                        Author
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-around flex-wrap mt-3 pt-3 pb-4 border-bottom">
                  <div className="d-flex align-items-start me-4 mt-3 gap-2">
                    <span className="badge bg-label-primary p-2 rounded">
                      <i className="ti ti-checkbox ti-sm" />
                    </span>
                    <div>
                      <p className="mb-0 fw-medium">1.23k</p>
                      <small>Tasks Done</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-start mt-3 gap-2">
                    <span className="badge bg-label-primary p-2 rounded">
                      <i className="ti ti-briefcase ti-sm" />
                    </span>
                    <div>
                      <p className="mb-0 fw-medium">568</p>
                      <small>Projects Done</small>
                    </div>
                  </div>
                </div>
                <p className="mt-4 small text-uppercase text-muted">Details</p>
                <div className="info-container">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="fw-medium me-1">Username:</span>
                      <span>violet.dev</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Email:</span>
                      <span>vafgot@vultukir.org</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Status:</span>
                      <span className="badge bg-label-success">Active</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Role:</span>
                      <span>Author</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Tax id:</span>
                      <span>Tax-8965</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Contact:</span>
                      <span>(123) 456-7890</span>
                    </li>
                    <li className="mb-2 pt-1">
                      <span className="fw-medium me-1">Languages:</span>
                      <span>French</span>
                    </li>
                    <li className="pt-1">
                      <span className="fw-medium me-1">Country:</span>
                      <span>England</span>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center">
                    <a
                      href="javascript:;"
                      className="btn btn-primary me-3"
                      data-bs-target="#editUser"
                      data-bs-toggle="modal"
                    >
                      Edit
                    </a>

                    <a
                      href="javascript:;"
                      className="btn btn-label-danger suspend-user"
                    >
                      Suspended
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
  )
}

export default Sidebar