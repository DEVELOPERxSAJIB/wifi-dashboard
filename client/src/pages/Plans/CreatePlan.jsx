import { useEffect, useState } from "react";
import { createNewPlan } from "../../features/plan/planApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import {
  gettingAllPlans,
  setMessageEmpty,
} from "../../features/plan/planSlice";
import MainLoader from "../../utils/Loaders/MainLoader";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";

const CreatePlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, loader } = useSelector(gettingAllPlans);

  // get data
  const [input, setInput] = useState({
    name: "",
    price: "",
    mbps: "",
    badge: "",
  });

  const [icon, setIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  // upload icon
  const handleIconUpload = (e) => {
    const icon = e.target.files[0];
    setIcon(icon);
    setIconPreview(URL.createObjectURL(icon));
  };

  // change input value with name
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("price", input.price);
    formData.append("mbps", input.mbps);
    formData.append("badge", input.badge);
    if (icon) {
      formData.append("planicon", icon);
    }

    dispatch(createNewPlan(formData));
  };

  // handle remove icon
  const handleRemoveIcon = (e) => {
    e.target.value = null;
    setIcon(null);
    setIconPreview(null);
  };

  useEffect(() => {
    if (message) {
      setInput({
        name: "",
        price: "",
        mbps: "",
        badge: "",
      });
      setIcon(null), 
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }

    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, navigate]);

  return (
    <>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="container">
            <div className="row my-5">
              <div className="col-md"></div>
              <div className="col-md-5">
                <div className="card">
                  <div className="card-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Create a new plan
                    </h5>
                  </div>

                  <div className="card-body">
                    <form
                      className="ecommerce-customer-add pt-0"
                      onSubmit={handleSubmitForm}
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
                            name="name"
                            value={input.name}
                            onChange={handleInputChange}
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
                            className="form-control"
                            name="price"
                            value={input.price}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="ecommerce-customer-add-email"
                          >
                            Data Speed (mbps)*
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="mbps"
                            value={input.mbps}
                            onChange={handleInputChange}
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
                            name="badge"
                            value={input.badge}
                            onChange={handleInputChange}
                          />
                        </div>

                        {icon && (
                          <div className="card border border-1 border-solid border-primary bg-danger my-3">
                            <img
                              className="relative"
                              src={iconPreview}
                              alt=""
                            />
                            <button
                              onClick={handleRemoveIcon}
                              className="btn btn-danger btn-sm absolute"
                            >
                              <BsTrash3 />
                            </button>
                          </div>
                        )}
                        <div>
                          <label
                            className="form-label"
                            htmlFor="ecommerce-customer-add-contact"
                          >
                            Icon (optional)
                          </label>
                          <input
                            type="file"
                            name="planicon"
                            className="form-control"
                            onChange={handleIconUpload}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-3">
                        <Link to={"/packages"}>
                          <button type="button" className="btn btn-secondary">
                            Back
                          </button>
                        </Link>
                        <button type="submit" className="btn btn-primary">
                          Save Plan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePlan;
