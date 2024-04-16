import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../../utils/Loaders/MainLoader";
import { deletePlan } from "../../features/plan/planApiSlice";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import { BsTrash3 } from "react-icons/bs";
import { LuPencilLine } from "react-icons/lu";
import Swal from "sweetalert2";
import {
  gettingAllPlans,
  setMessageEmpty,
} from "../../features/plan/planSlice";
import { Link, useNavigate } from "react-router-dom";

const Plans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { plans, message, error, loader } = useSelector(gettingAllPlans);

  // delete plan
  const handleDeletePlan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#685DD8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePlan(id));
      }
    });
  };

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }

    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="d-flex justify-content-between py-3 mb-2">
            <h4>
              <span className="text-muted fw-light"></span> Pricing & Plans
            </h4>
            <Link to={"/create-plan"}>
              <button
                className="btn btn-secondary add-new btn-primary waves-effect waves-light"
                type="button"
              >
                <span>
                  <i className="ti ti-plus me-0 me-sm-1 ti-xs" />
                  <span className="d-none d-sm-inline-block">Add Plans</span>
                </span>
              </button>
            </Link>
          </div>

          <div className="card">
            <div className="rounded-top">
              <div className="container py-5">
                {plans.length > 0 ? (
                  <div className="row mx-0 gy-3 px-lg-5">
                    {plans.slice().reverse().map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="col-lg-4 mb-md-0 mb-5 pt-2"
                        >
                          <div className="card border-primary border shadow-none">
                            <div className="card-body position-relative">
                              <div className="position-absolute end-0 me-4 top-0 mt-4">
                                <span className="badge bg-label-primary">
                                  {item.badge && item.badge}
                                </span>
                              </div>
                              <div className="my-3 pt-3 text-center plan-img">
                                <img
                                  src={
                                    item?.icon?.url
                                      ? item?.icon?.url
                                      : "../../src/assets/img/illustrations/page-pricing-standard.png"
                                  }
                                  alt="Standard Image"
                                  height={140}
                                />
                              </div>
                              <h3 className="card-title text-center text-capitalize mb-1">
                                {item.name} ({item.mbps} mbps)
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
                              <div className="d-flex gap-1 justify-content-end mt-2">
                                <button
                                  onClick={() => navigate(`/update-plan/${item._id}`)}
                                  className="btn btn-warning btn-sm"
                                >
                                  <LuPencilLine />
                                </button>
                                <button
                                  onClick={() => handleDeletePlan(item._id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <BsTrash3 />
                                </button>
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
      )}
    </>
  );
};

export default Plans;
