import React, { useEffect } from "react";
import { Redirect, Route, Switch,Link } from "react-router-dom";
import { useSubheader } from "../../../_metronic/layout";
import AccountInformation from "./AccountInformation";
import { ProfileOverview } from "./ProfileOverview";
import ChangePassword from "./ChangePassword";
import PersonaInformation from "./PersonaInformation";
import EmailSettings from "./EmailSettings";
import { shallowEqual, useSelector } from "react-redux";
import { ProfileCard } from "./components/ProfileCard";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

export default function UserProfilePage() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("User profile");
  const user = useSelector(({ auth }) => auth.user, shallowEqual);
  console.log(user, "userdataa")
  useEffect(() => {
    return () => { };
  }, [user]);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (

    <Card>
      {/* <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            User Profile
          </h3>

        </div>

      </div> */}
      <div className="form">

        {/* begin::Body */}
        <div className="card-body">
          <div className="row">
            <label className="col-xl-3"></label>

          </div>

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <span className={`form-control form-control-lg form-control-solid `}>{user.firstname} {user.lastname}</span>

            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Email
            </label>
            <div className="col-lg-9 col-xl-6">
              <span className={`form-control form-control-lg form-control-solid `}>{user.email}</span>

            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Role
            </label>
            <div className="col-lg-9 col-xl-6">
              <span className={`form-control form-control-lg form-control-solid `}>{capitalizeFirstLetter(user.userrole[0])}</span>

            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Reporting Manager
            </label>
            <div className="col-lg-9 col-xl-6">
              <span className={`form-control form-control-lg form-control-solid `}>{user.reporting_manager[0].firstname} {" "} {user.reporting_manager[0].lastname}</span>

            </div>
          </div>
          <div className="card-toolbar">

            <Link
              to="/dashboard"
              className="btn btn-secondary"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </Card>


  );
}
