import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";

const Layout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <Sidebar sidebar={sidebarOpen} />

            <div className="layout-page">
              <Navbar toggleSidebar={toggleSidebar} />

              <div className="content-wrapper">
                <Outlet />

                <div className="content-backdrop fade" />
              </div>
            </div>
          </div>

          <div className="layout-overlay layout-menu-toggle" />

          <div className="drag-target" />
        </div>
      </div>
    </>
  );
};

export default Layout;
