import Billing from "../Billing/Billing";
import Security from "../Security/Security";

const Tabs = () => {
  return (
    <>
      <div>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <i className="ti ti-user-check ti-xs me-1" />
              Account
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              <i className="ti ti-lock ti-xs me-1" />
              Security
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              <i className="ti ti-currency-dollar me-1 ti-xs"></i>Billing &
              Plans
            </button>
          </li>
        </ul>

        {/* Tabs Data */}

        <div className="tab-content" id="pills-tabContent">
          {/* === 1st Tab === */}
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="card mb-4">
              <h5 className="card-header">User Activity Timeline</h5>
              <div className="card-body pb-0">
                <ul className="timeline mb-0">
                  <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-primary" />
                    <div className="timeline-event">
                      <div className="timeline-header mb-1">
                        <h6 className="mb-0">12 Invoices have been paid</h6>
                        <small className="text-muted">12 min ago</small>
                      </div>
                      <p className="mb-2">
                        Invoices have been paid to the company
                      </p>
                      <div className="d-flex">
                        <a href="javascript:void(0)" className="me-3">
                          <img
                            src="../../assets/img/icons/misc/pdf.png"
                            alt="PDF image"
                            width={15}
                            className="me-2"
                          />
                          <span className="fw-medium text-heading">
                            invoices.pdf
                          </span>
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-warning" />
                    <div className="timeline-event">
                      <div className="timeline-header mb-1">
                        <h6 className="mb-0">Client Meeting</h6>
                        <small className="text-muted">45 min ago</small>
                      </div>
                      <p className="mb-2">Project meeting with john @10:15am</p>
                      <div className="d-flex flex-wrap">
                        <div className="avatar me-3">
                          <img
                            src="../../assets/img/avatars/3.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">Lester McCarthy (Client)</h6>
                          <small>CEO of Pixinvent</small>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item timeline-item-transparent">
                    <span className="timeline-point timeline-point-info" />
                    <div className="timeline-event">
                      <div className="timeline-header mb-1">
                        <h6 className="mb-0">
                          Create a new project for client
                        </h6>
                        <small className="text-muted">2 Day Ago</small>
                      </div>
                      <p className="mb-2">5 team members in a project</p>
                      <div className="d-flex align-items-center avatar-group">
                        <div
                          className="avatar pull-up"
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          title="Vinnie Mostowy"
                        >
                          <img
                            src="../../assets/img/avatars/5.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div
                          className="avatar pull-up"
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          title="Marrie Patty"
                        >
                          <img
                            src="../../assets/img/avatars/12.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div
                          className="avatar pull-up"
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          title="Jimmy Jackson"
                        >
                          <img
                            src="../../assets/img/avatars/9.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div
                          className="avatar pull-up"
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          title="Kristine Gill"
                        >
                          <img
                            src="../../assets/img/avatars/6.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div
                          className="avatar pull-up"
                          data-bs-toggle="tooltip"
                          data-popup="tooltip-custom"
                          data-bs-placement="top"
                          title="Nelson Wilson"
                        >
                          <img
                            src="../../assets/img/avatars/4.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item timeline-item-transparent border-transparent">
                    <span className="timeline-point timeline-point-success" />
                    <div className="timeline-event">
                      <div className="timeline-header mb-1">
                        <h6 className="mb-0">Design Review</h6>
                        <small className="text-muted">5 days Ago</small>
                      </div>
                      <p className="mb-0">
                        Weekly review of freshly prepared design for our new
                        app.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* === 2nd Tab === */}
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Security />
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <Billing />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
