import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../layout";
import {Demo1Dashboard} from "./Demo1Dashboard";
import EmployeeDashboard from "../../../app/modules/Dashboard/EmployeeDashboard";
import MangerDashboard from "../../../app/modules/Dashboard/MangerDashboard";
import {Demo2Dashboard} from "./Demo2Dashboard";
import {Demo3Dashboard} from "./Demo3Dashboard";
import {Demo4Dashboard} from "./Demo4Dashboard";
import {Demo5Dashboard} from "./Demo5Dashboard";
import {Demo6Dashboard} from "./Demo6Dashboard";
import {Demo7Dashboard} from "./Demo7Dashboard";

export function Dashboard() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            demo: objectPath.get(
                uiService.config,
                "demo"
            )};
    }, [uiService]);
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.user.userrole[0];
    return <>
    {(() => {
          if (role == "manager") {
              return layoutProps.demo === 'demo1' && <MangerDashboard />
          }else{
            return layoutProps.demo === 'demo1' && <EmployeeDashboard />
          }
          })()}
        
        {/* {layoutProps.demo === 'demo2' && <Demo2Dashboard />}
        {layoutProps.demo === 'demo3' && <Demo3Dashboard />}
        {layoutProps.demo === 'demo4' && <Demo4Dashboard />}
        {layoutProps.demo === 'demo5' && <Demo5Dashboard />}
        {layoutProps.demo === 'demo6' && <Demo6Dashboard />}
        {layoutProps.demo === 'demo7' && <Demo7Dashboard />} */}
    </>;
}
