import React, { Fragment } from "react";
import AccessPage from "../../../components/access/AccessPage";
import Header from "../../../components/header/Header";
import Sidebar from "./SideBar";

import '../Admin.css';

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <AccessPage roles={["admin"]}>
        <Header />
        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          {children}
        </div>
      </AccessPage>
    </Fragment>
  );
};

export default AdminLayout;
