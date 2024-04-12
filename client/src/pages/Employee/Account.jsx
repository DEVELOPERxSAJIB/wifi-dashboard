import Sidebar from "../../components/Account/Sidebar/Sidebar";
import Tabs from "../../components/Account/Tabs/Tabs";

const Account = () => {
  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 mb-4">
          <span className="text-muted fw-light"></span> Account
        </h4>
        <div className="row">
          <Sidebar />

          <div className="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
            <Tabs />
          </div>
        </div>
        {/* Modal */}
        {/* Edit User Modal */}
        <div
          className="modal fade"
          id="editUser"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-simple modal-edit-user">
            <div className="modal-content p-3 p-md-5">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
                <div className="text-center mb-4">
                  <h3 className="mb-2">Edit User Information</h3>
                  <p className="text-muted">
                    Updating user details will receive a privacy audit.
                  </p>
                </div>
                <form id="editUserForm" className="row g-3">
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label"
                      htmlFor="modalEditUserFirstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="modalEditUserFirstName"
                      name="modalEditUserFirstName"
                      className="form-control"
                      placeholder="John"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label"
                      htmlFor="modalEditUserLastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="modalEditUserLastName"
                      name="modalEditUserLastName"
                      className="form-control"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="modalEditUserName">
                      Username
                    </label>
                    <input
                      type="text"
                      id="modalEditUserName"
                      name="modalEditUserName"
                      className="form-control"
                      placeholder="john.doe.007"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="modalEditUserEmail">
                      Email
                    </label>
                    <input
                      type="text"
                      id="modalEditUserEmail"
                      name="modalEditUserEmail"
                      className="form-control"
                      placeholder="example@domain.com"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="modalEditUserStatus">
                      Status
                    </label>
                    <select
                      id="modalEditUserStatus"
                      name="modalEditUserStatus"
                      className="select2 form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Status</option>
                      <option value={1}>Active</option>
                      <option value={2}>Inactive</option>
                      <option value={3}>Suspended</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="modalEditTaxID">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      id="modalEditTaxID"
                      name="modalEditTaxID"
                      className="form-control modal-edit-tax-id"
                      placeholder="123 456 7890"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label" htmlFor="modalEditUserPhone">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">US (+1)</span>
                      <input
                        type="text"
                        id="modalEditUserPhone"
                        name="modalEditUserPhone"
                        className="form-control phone-number-mask"
                        placeholder="202 555 0111"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label"
                      htmlFor="modalEditUserLanguage"
                    >
                      Language
                    </label>
                    <select
                      id="modalEditUserLanguage"
                      name="modalEditUserLanguage"
                      className="select2 form-select"
                      multiple
                    >
                      <option value>Select</option>
                      <option value="english" selected>
                        English
                      </option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="dutch">Dutch</option>
                      <option value="hebrew">Hebrew</option>
                      <option value="sanskrit">Sanskrit</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label
                      className="form-label"
                      htmlFor="modalEditUserCountry"
                    >
                      Country
                    </label>
                    <select
                      id="modalEditUserCountry"
                      name="modalEditUserCountry"
                      className="select2 form-select"
                      data-allow-clear="true"
                    >
                      <option value>Select</option>
                      <option value="Australia">Australia</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Canada">Canada</option>
                      <option value="China">China</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Japan">Japan</option>
                      <option value="Korea">Korea, Republic of</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Russia">Russian Federation</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="switch">
                      <input type="checkbox" className="switch-input" />
                      <span className="switch-toggle-slider">
                        <span className="switch-on" />
                        <span className="switch-off" />
                      </span>
                      <span className="switch-label">
                        Use as a billing address?
                      </span>
                    </label>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary me-sm-3 me-1"
                    >
                      Submit
                    </button>
                    <button
                      type="reset"
                      className="btn btn-label-secondary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*/ Edit User Modal */}
        {/* Add New Credit Card Modal */}
        <div
          className="modal fade"
          id="upgradePlanModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-simple modal-upgrade-plan">
            <div className="modal-content p-3 p-md-5">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
                <div className="text-center mb-4">
                  <h3 className="mb-2">Upgrade Plan</h3>
                  <p>Choose the best plan for user.</p>
                </div>
                <form id="upgradePlanForm" className="row g-3">
                  <div className="col-sm-8">
                    <label className="form-label" htmlFor="choosePlan">
                      Choose Plan
                    </label>
                    <select
                      id="choosePlan"
                      name="choosePlan"
                      className="form-select"
                      aria-label="Choose Plan"
                    >
                      <option selected>Choose Plan</option>
                      <option value="standard">Standard - $99/month</option>
                      <option value="exclusive">Exclusive - $249/month</option>
                      <option value="Enterprise">
                        Enterprise - $499/month
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-4 d-flex align-items-end">
                    <button type="submit" className="btn btn-primary">
                      Upgrade
                    </button>
                  </div>
                </form>
              </div>
              <hr className="mx-md-n5 mx-n3" />
              <div className="modal-body">
                <p className="mb-0">User current plan is standard plan</p>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex justify-content-center me-2">
                    <sup className="h6 pricing-currency pt-1 mt-3 mb-0 me-1 text-primary">
                      $
                    </sup>
                    <h1 className="display-5 mb-0 text-primary">99</h1>
                    <sub className="h5 pricing-duration mt-auto mb-2 text-muted">
                      /month
                    </sub>
                  </div>
                  <button className="btn btn-label-danger cancel-subscription mt-3">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/ Add New Credit Card Modal */}
        {/* /Modal */}
      </div>
    </>
  );
};

export default Account;
