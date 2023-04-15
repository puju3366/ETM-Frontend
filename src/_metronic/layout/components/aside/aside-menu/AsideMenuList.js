/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { connect, useDispatch, useSelector } from 'react-redux';
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { fetchRolesAndPermissions } from "../../../../../app/modules/user/redux/functions";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
      "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };
  const token = localStorage.getItem('persist:v726-demo1-auth')
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user.user.userrole[0];
  const permissions = useSelector((state) => state.auth.user.user_permission[0].rights[0])
  const permissionArray = Object.values(permissions)

  const asideMenuList = permissionArray.map((rights) => {
    const value = rights[0].replace("-", " ");
    const name = value.split("/");

    return rights.map(item => {
      const url1 = item.split("/")
      const name1 = url1[0].replace("-", " ");
      const forParent = name1.split(" ");
      if (url1[1] == "view") {

        return (
          <li
            key={url1[0]}
            className={`menu-item ${getMenuItemActive(`/${url1[0]}`, false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to={"/" + url1[0]}>
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
              </span>
              <span className="menu-text"> {name1.charAt(0).toUpperCase() + name1.slice(1)} </span>
            </NavLink>
          </li>
        )

      }
    })
  })
  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        {asideMenuList}
      </ul>





      {/* end::Menu Nav */}
    </>
  );
}
