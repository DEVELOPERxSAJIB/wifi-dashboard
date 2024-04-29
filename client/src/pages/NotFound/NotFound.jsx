import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>
        <div className="container-xxl container-p-y">
          <div className="misc-wrapper">
            <h2 className="mb-1 mt-4">Page Not Found :(</h2>
            <p className="mb-4 mx-2">
              Oops! The requested URL was not found on this server.
            </p>
            <Link to="/" className="btn btn-primary mb-4">
              Back to home
            </Link>
            <div className="mt-4">
              <img
                src="../../src/assets/img/illustrations/page-misc-error.png"
                alt="page-misc-error"
                width={225}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <div className="container-fluid misc-bg-wrapper">
          <img
            src="../../src/assets/img/illustrations/bg-shape-image-light.png"
            alt="page-misc-error"
            data-app-light-img="illustrations/bg-shape-image-light.png"
            data-app-dark-img="illustrations/bg-shape-image-dark.html"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
