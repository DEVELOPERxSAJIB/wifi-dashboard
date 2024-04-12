const CreateEmployee = () => {
  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 mb-0">
          <span className="text-muted fw-light">Employees /</span>
          <span className="fw-medium"> Add Employee</span>
        </h4>
        <div className="app-ecommerce">
          {/* Add Product */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div className="d-flex flex-column justify-content-center">
              <h4 className="mb-1 mt-3">Add a new Product</h4>
              <p className="text-muted">Orders placed across your store</p>
            </div>
            <div className="d-flex align-content-center flex-wrap gap-3">
              <button type="submit" className="btn btn-primary">
                Publish Profile
              </button>
            </div>
          </div>
          <div className="row">
            {/* First column*/}
            <div className="col-12 col-lg-8">
              {/* Product Information */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="card-tile mb-0">Product information</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="ecommerce-product-name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ecommerce-product-name"
                      placeholder="Product title"
                      name="productTitle"
                      aria-label="Product title"
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-product-sku"
                      >
                        SKU
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="ecommerce-product-sku"
                        placeholder="SKU"
                        name="productSku"
                        aria-label="Product SKU"
                      />
                    </div>
                    <div className="col">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-product-barcode"
                      >
                        Barcode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ecommerce-product-barcode"
                        placeholder="0123-4567"
                        name="productBarcode"
                        aria-label="Product barcode"
                      />
                    </div>
                  </div>
                  {/* Description */}
                  <div>
                    <label className="form-label">Description (Optional)</label>

                    <textarea
                      type=""
                      className="form-control"
                      placeholder="Add description . . ."
                      aria-label="Product barcode"
                      style={{ height: "200px" }}
                    />
                  </div>
                </div>
              </div>
              {/* /Product Information */}
              {/* Media */}
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 card-title">Media</h5>
                  <a href="javascript:void(0);" className="fw-medium">
                    Add media from URL
                  </a>
                </div>
                <div className="card-body">
                  <form
                    action="https://demos.pixinvent.com/upload"
                    className="dropzone needsclick"
                    id="dropzone-basic"
                  >
                    <div className="dz-message needsclick">
                      <p className="fs-4 note needsclick pt-3 mb-1">
                        Drag and drop your image here
                      </p>
                      <p className="text-muted d-block fw-normal mb-2">or</p>
                      <span
                        className="note needsclick btn bg-label-primary d-inline"
                        id="btnBrowse"
                      >
                        Browse image
                      </span>
                    </div>
                    <div className="fallback">
                      <input name="file" type="file" />
                    </div>
                  </form>
                </div>
              </div>
              {/* /Media */}
              {/* Variants */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="card-title mb-0">Variants</h5>
                </div>
                <div className="card-body">
                  <form className="form-repeater">
                    <div data-repeater-list="group-a">
                      <div data-repeater-item>
                        <div className="row">
                          <div className="mb-3 col-4">
                            <label
                              className="form-label"
                              htmlFor="form-repeater-1-1"
                            >
                              Options
                            </label>
                            <select
                              id="form-repeater-1-1"
                              className="select2 form-select"
                              data-placeholder="Size"
                            >
                              <option value>Size</option>
                              <option value="size">Size</option>
                              <option value="color">Color</option>
                              <option value="weight">Weight</option>
                              <option value="smell">Smell</option>
                            </select>
                          </div>
                          <div className="mb-3 col-8">
                            <label
                              className="form-label invisible"
                              htmlFor="form-repeater-1-2"
                            >
                              Not visible
                            </label>
                            <input
                              type="number"
                              id="form-repeater-1-2"
                              className="form-control"
                              placeholder="Enter size"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary" data-repeater-create>
                        Add another option
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* /Variants */}
              {/* Inventory */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="card-title mb-0">Inventory</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {/* Navigation */}
                    <div className="col-12 col-md-4 mx-auto card-separator">
                      <div className="d-flex justify-content-between flex-column mb-3 mb-md-0 pe-md-3">
                        <ul className="nav nav-align-left nav-pills flex-column">
                          <li className="nav-item">
                            <button
                              className="nav-link py-2 active"
                              data-bs-toggle="tab"
                              data-bs-target="#restock"
                            >
                              <i className="ti ti-box me-2" />
                              <span className="align-middle">Restock</span>
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className="nav-link py-2"
                              data-bs-toggle="tab"
                              data-bs-target="#shipping"
                            >
                              <i className="ti ti-car me-2" />
                              <span className="align-middle">Shipping</span>
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className="nav-link py-2"
                              data-bs-toggle="tab"
                              data-bs-target="#global-delivery"
                            >
                              <i className="ti ti-world me-2" />
                              <span className="align-middle">
                                Global Delivery
                              </span>
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className="nav-link py-2"
                              data-bs-toggle="tab"
                              data-bs-target="#attributes"
                            >
                              <i className="ti ti-link me-2" />
                              <span className="align-middle">Attributes</span>
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className="nav-link py-2"
                              data-bs-toggle="tab"
                              data-bs-target="#advanced"
                            >
                              <i className="ti ti-lock me-2" />
                              <span className="align-middle">Advanced</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /Navigation */}
                    {/* Options */}
                    <div className="col-12 col-md-8 pt-4 pt-md-0">
                      <div className="tab-content p-0 ps-md-3">
                        {/* Restock Tab */}
                        <div
                          className="tab-pane fade show active"
                          id="restock"
                          role="tabpanel"
                        >
                          <h5>Options</h5>
                          <label
                            className="form-label"
                            htmlFor="ecommerce-product-stock"
                          >
                            Add to Stock
                          </label>
                          <div className="row mb-3 g-3 pe-md-5">
                            <div className="col-12 col-sm-9">
                              <input
                                type="number"
                                className="form-control"
                                id="ecommerce-product-stock"
                                placeholder="Quantity"
                                name="quantity"
                                aria-label="Quantity"
                              />
                            </div>
                            <div className="col-12 col-sm-3">
                              <button className="btn btn-primary align-items-center">
                                <i className="ti ti-check me-2 ti-xs" />
                                Confirm
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="mb-1">
                              <span className="h6">Product in stock now:</span>
                              <span>54</span>
                            </p>
                            <p className="mb-1">
                              <span className="h6">Product in transit: </span>
                              <span>390</span>
                            </p>
                            <p className="mb-1">
                              <span className="h6">Last time restocked:</span>
                              <span>24th June, 2023</span>
                            </p>
                            <p className="mb-1">
                              <span className="h6">
                                Total stock over lifetime:
                              </span>
                              <span>2430</span>
                            </p>
                          </div>
                        </div>
                        {/* Shipping Tab */}
                        <div
                          className="tab-pane fade"
                          id="shipping"
                          role="tabpanel"
                        >
                          <h5 className="mb-4">Shipping Type</h5>
                          <div>
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="shippingType"
                                id="seller"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="seller"
                              >
                                <span className="fw-medium d-block mb-1">
                                  Fulfilled by Seller
                                </span>
                                <small>
                                  Youll be responsible for product delivery.
                                  <br />
                                  Any damage or delay during shipping may cost
                                  you a Damage fee.
                                </small>
                              </label>
                            </div>
                            <div className="form-check mb-5">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="shippingType"
                                id="companyName"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="companyName"
                              >
                                <span className="fw-medium d-block mb-1">
                                  Fulfilled by Company name &nbsp;
                                  <span className="badge rounded-2 badge-warning bg-label-warning fs-tiny py-1 border border-warning">
                                    RECOMMENDED
                                  </span>
                                </span>
                                <small>
                                  Your product, Our responsibility.
                                  <br />
                                  For a measly fee, we will handle the delivery
                                  process for you.
                                </small>
                              </label>
                            </div>
                            <p className="mb-0">
                              See our
                              <a href="javascript:void(0);">
                                Delivery terms and conditions
                              </a>
                              for details
                            </p>
                          </div>
                        </div>
                        {/* Global Delivery Tab */}
                        <div
                          className="tab-pane fade"
                          id="global-delivery"
                          role="tabpanel"
                        >
                          <h5 className="mb-4">Global Delivery</h5>
                          {/* Worldwide delivery */}
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="globalDel"
                              id="worldwide"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="worldwide"
                            >
                              <span className="fw-medium mb-1 d-block">
                                Worldwide delivery
                              </span>
                              <small>
                                Only available with Shipping method:
                                <a href="javascript:void(0);">
                                  Fulfilled by Company name
                                </a>
                              </small>
                            </label>
                          </div>
                          {/* Global delivery */}
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="globalDel"
                              defaultChecked
                            />
                            <label
                              className="form-check-label w-75 pe-5"
                              htmlFor="country-selected"
                            >
                              <span className="fw-medium d-block mb-1">
                                Selected Countries
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Type Country name"
                                id="country-selected"
                              />
                            </label>
                          </div>
                          {/* Local delivery */}
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="globalDel"
                              id="local"
                            />
                            <label className="form-check-label" htmlFor="local">
                              <span className="fw-medium mb-1 d-block">
                                Local delivery
                              </span>
                              <small>
                                Deliver to your country of residence :
                                <a href="javascript:void(0);">
                                  Change profile address
                                </a>
                              </small>
                            </label>
                          </div>
                        </div>
                        {/* Attributes Tab */}
                        <div
                          className="tab-pane fade"
                          id="attributes"
                          role="tabpanel"
                        >
                          <h5 className="mb-4">Attributes</h5>
                          <div>
                            {/* Fragile Product */}
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue="fragile"
                                id="fragile"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="fragile"
                              >
                                <span className="fw-medium">
                                  Fragile Product
                                </span>
                              </label>
                            </div>
                            {/* Biodegradable */}
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue="biodegradable"
                                id="biodegradable"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="biodegradable"
                              >
                                <span className="fw-medium">Biodegradable</span>
                              </label>
                            </div>
                            {/* Frozen Product */}
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue="frozen"
                                defaultChecked
                              />
                              <label
                                className="form-check-label w-75 pe-5"
                                htmlFor="frozen"
                              >
                                <span className="fw-medium mb-1 d-block">
                                  Frozen Product
                                </span>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Max. allowed Temperature"
                                  id="frozen"
                                />
                              </label>
                            </div>
                            {/* Exp Date */}
                            <div className="form-check mb-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue="expDate"
                                id="expDate"
                                defaultChecked
                              />
                              <label
                                className="form-check-label w-75 pe-5"
                                htmlFor="date-input"
                              >
                                <span className="fw-medium mb-1 d-block">
                                  Expiry Date of Product
                                </span>
                                <input
                                  type="date"
                                  className="product-date form-control"
                                  id="date-input"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* /Attributes Tab */}
                        {/* Advanced Tab */}
                        <div
                          className="tab-pane fade"
                          id="advanced"
                          role="tabpanel"
                        >
                          <h5 className="mb-4">Advanced</h5>
                          <div className="row">
                            {/* Product Id Type */}
                            <div className="col">
                              <label
                                className="form-label"
                                htmlFor="product-id"
                              >
                                <span className="mb-1 h6">Product ID Type</span>
                              </label>
                              <select
                                id="product-id"
                                className="select2 form-select"
                                data-placeholder="ISBN"
                              >
                                <option value>ISBN</option>
                                <option value="ISBN">ISBN</option>
                                <option value="UPC">UPC</option>
                                <option value="EAN">EAN</option>
                                <option value="JAN">JAN</option>
                              </select>
                            </div>
                            {/* Product Id */}
                            <div className="col">
                              <label
                                className="form-label"
                                htmlFor="product-id-1"
                              >
                                <span className="mb-1 h6">Product ID</span>
                              </label>
                              <input
                                type="number"
                                id="product-id-1"
                                className="form-control"
                                placeholder="ISBN Number"
                              />
                            </div>
                          </div>
                        </div>
                        {/* /Advanced Tab */}
                      </div>
                    </div>
                    {/* /Options*/}
                  </div>
                </div>
              </div>
              {/* /Inventory */}
            </div>
            {/* /Second column */}
            {/* Second column */}
            <div className="col-12 col-lg-4">
              {/* Pricing Card */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="card-title mb-0">Pricing</h5>
                </div>
                <div className="card-body">
                  {/* Base Price */}
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="ecommerce-product-price"
                    >
                      Base Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="ecommerce-product-price"
                      placeholder="Price"
                      name="productPrice"
                      aria-label="Product price"
                    />
                  </div>
                  {/* Discounted Price */}
                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="ecommerce-product-discount-price"
                    >
                      Discounted Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="ecommerce-product-discount-price"
                      placeholder="Discounted Price"
                      name="productDiscountedPrice"
                      aria-label="Product discounted price"
                    />
                  </div>
                  {/* Charge tax check box */}
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                      id="price-charge-tax"
                      defaultChecked
                    />
                    <label className="form-label" htmlFor="price-charge-tax">
                      Charge tax on this product
                    </label>
                  </div>
                  {/* Instock switch */}
                  <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <h6 className="mb-0">In stock</h6>
                    <div className="w-25 d-flex justify-content-end">
                      <label className="switch switch-primary switch-sm me-4 pe-2">
                        <input
                          type="checkbox"
                          className="switch-input"
                          defaultChecked
                        />
                        <span className="switch-toggle-slider">
                          <span className="switch-on">
                            <span className="switch-off" />
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Pricing Card */}
              {/* Organize Card */}
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="card-title mb-0">Organize</h5>
                </div>
                <div className="card-body">
                  {/* Vendor */}
                  <div className="mb-3 col ecommerce-select2-dropdown">
                    <label className="form-label mb-1" htmlFor="vendor">
                      Vendor
                    </label>
                    <select
                      id="vendor"
                      className="select2 form-select"
                      data-placeholder="Select Vendor"
                    >
                      <option value>Select Vendor</option>
                      <option value="men-clothing">Mens Clothing</option>
                      <option value="women-clothing">Womens-clothing</option>
                      <option value="kid-clothing">Kids-clothing</option>
                    </select>
                  </div>
                  {/* Category */}
                  <div className="mb-3 col ecommerce-select2-dropdown">
                    <label
                      className="form-label mb-1 d-flex justify-content-between align-items-center"
                      htmlFor="category-org"
                    >
                      <span>Category</span>
                      <a href="javascript:void(0);" className="fw-medium">
                        Add new category
                      </a>
                    </label>
                    <select
                      id="category-org"
                      className="select2 form-select"
                      data-placeholder="Select Category"
                    >
                      <option value>Select Category</option>
                      <option value="Household">Household</option>
                      <option value="Management">Management</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Office">Office</option>
                      <option value="Automotive">Automotive</option>
                    </select>
                  </div>
                  {/* Collection */}
                  <div className="mb-3 col ecommerce-select2-dropdown">
                    <label className="form-label mb-1" htmlFor="collection">
                      Collection
                    </label>
                    <select
                      id="collection"
                      className="select2 form-select"
                      data-placeholder="Collection"
                    >
                      <option value>Collection</option>
                      <option value="men-clothing">Mens Clothing</option>
                      <option value="women-clothing">Womens-clothing</option>
                      <option value="kid-clothing">Kids-clothing</option>
                    </select>
                  </div>
                  {/* Status */}
                  <div className="mb-3 col ecommerce-select2-dropdown">
                    <label className="form-label mb-1" htmlFor="status-org">
                      Status
                    </label>
                    <select
                      id="status-org"
                      className="select2 form-select"
                      data-placeholder="Published"
                    >
                      <option value>Published</option>
                      <option value="Published">Published</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  {/* Tags */}
                  <div className="mb-3">
                    <label
                      htmlFor="ecommerce-product-tags"
                      className="form-label mb-1"
                    >
                      Tags
                    </label>
                    <input
                      id="ecommerce-product-tags"
                      className="form-control"
                      name="ecommerce-product-tags"
                      defaultValue="Normal,Standard,Premium"
                      aria-label="Product Tags"
                    />
                  </div>
                </div>
              </div>
              {/* /Organize Card */}
            </div>
            {/* /Second column */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
