import { useState } from "react";
import { Audio, Triangle } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Plans = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { plans, message, error, loader } = useSelector((state) => state.plan);

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex justify-content-between py-3 mb-2">
        <h4>
          <span className="text-muted fw-light"></span> Pricing & Plans
        </h4>
        <button
          className="btn btn-secondary add-new btn-primary waves-effect waves-light"
          type="button"
          onClick={toggleModal}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <span>
            <i className="ti ti-plus me-0 me-sm-1 ti-xs" />
            <span className="d-none d-sm-inline-block">Add Plans</span>
          </span>
        </button>

        {/* Modal */}
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Create a new plan
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  className="ecommerce-customer-add pt-0"
                  id="eCommerceCustomerAddForm"
                >
                  <div className="ecommerce-customer-add-basic mb-3">
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-name"
                      >
                        Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="customerName"
                        aria-label="John Doe"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-email"
                      >
                        Price*
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-email"
                        className="form-control"
                        name="customerEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-email"
                      >
                        Badge (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="customerEmail"
                      />
                    </div>
                    <div>
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-contact"
                      >
                        Icon (optional)
                      </label>
                      <input
                        type="file"
                        id="ecommerce-customer-add-contact"
                        className="form-control phone-mask"
                        placeholder="+(123) 456-7890"
                        aria-label="+(123) 456-7890"
                        name="customerContact"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="rounded-top">
          <div className="container py-5">
            {plans.length > 0 ? (
              <div className="row mx-0 gy-3 px-lg-5">
                {plans?.map((item) => {
                  return (
                    <div key={item._id} className="col-lg-4 mb-md-0 mb-5 pt-2">
                      <div className="card border-primary border shadow-none">
                        <div className="card-body position-relative">
                          <div className="position-absolute end-0 me-4 top-0 mt-4">
                            <span className="badge bg-label-primary">
                              {item.badge && item.badge}
                            </span>
                          </div>
                          <div className="my-3 pt-2 text-center">
                            {!item?.icon?.url === null ? (
                              <img
                                src={
                                  item?.icon
                                    ? item?.icon?.url
                                    : "../../src/assets/img/illustrations/page-pricing-standard.png"
                                }
                                alt="Standard Image"
                                height={140}
                              />
                            ) : (
                              <Triangle
                                visible={true}
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="triangle-loading"
                              />
                            )}
                          </div>
                          <h3 className="card-title text-center text-capitalize mb-1">
                            {item.name}
                          </h3>

                          <div className="text-center">
                            <div className="d-flex justify-content-center">
                              <sup
                                style={{ fontSize: "30px" }}
                                className="h6 pricing-currency mt-3 mb-0 me-1 text-primary"
                              >
                                ৳
                              </sup>
                              <h1 className="price-toggle price-yearly display-4 text-primary mb-0">
                                {item.price}
                              </h1>
                              <h1 className="price-toggle price-monthly display-4 text-primary mb-0 d-none">
                                9
                              </h1>
                              <sub className="h6 text-muted pricing-duration mt-auto mb-2 fw-normal">
                                /month
                              </sub>
                            </div>
                            <small className="price-yearly price-yearly-toggle text-muted">
                              <span style={{ fontSize: "20px" }}>৳ </span>
                              {item.price * 12} / year
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="col-lg mb-md-0">
                <div className="card border-primary border border-2 shadow-none">
                  <div className="card-body text-center position-relative">
                    <h4 className="m-0 text-primary">No plans found</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
