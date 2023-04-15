/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import {
  DropdownCustomToggler,
  DropdownMenu4,
} from "../../../../_metronic/_partials/dropdowns";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";

export function ProfileCard() {
  const user = useSelector(({ auth }) => auth.user, shallowEqual);
  console.log(user.userrole[0], "userdataa")
  useEffect(() => {
    return () => { };
  }, [user]);

  return (
    <>
      {user && (

        <Card>
          <div className="card-header py-3">
            <div className="card-title align-items-start flex-column">
              <h3 className="card-label font-weight-bolder text-dark">
                User Profile
              </h3>

            </div>

          </div>
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
                  <span className={`form-control form-control-lg form-control-solid `}>{user.userrole[0]}</span>

                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Reporting Manager
                </label>
                <div className="col-lg-9 col-xl-6">
                  <span className={`form-control form-control-lg form-control-solid `}>{user.firstname} {user.lastname}</span>

                </div>
              </div>
              {/* <div className="card-toolbar">

                <Link
                  to="/user"
                  className="btn btn-secondary"
                >
                  Cancel
                </Link>
              </div> */}
            </div>
          </div>
        </Card>

      )}
    </>
  );
}
