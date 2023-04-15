import React, { useEffect, useState } from "react";
// import { MyWidget} from "../../_metronic/_partials/widgets/mixed/MyWidget";
import { MyWidget } from "../../../_metronic/_partials/widgets/mixed/MyWidget";
import { ListsWidget9 } from "../../../_metronic/_partials/widgets/lists/ListsWidget9";
import { StatsWidget11 } from "../../../_metronic/_partials/widgets/stats/StatsWidget11";
import { StatsWidget12 } from "../../../_metronic/_partials/widgets/stats/StatsWidget12";
import { connect } from "react-redux";
import { getEmployeeDash, getTimelineDashboard } from "./redux/function";
import { EmployeeDashboardData } from "./redux/action"




function EmployeeDashboard(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.user._id;
  // const dashboardData = {};
  const [EmployeeDashboardData, setEmployeeDashboardData] = useState([]);
  const [EmployeeTimelineDashboardData, setEmployeeTimelineDashboardData] = useState([]);

  useEffect(() => {
    getEmployeeDash(id, user)
      .then((response) => response.json()).then((responseJson) => {
        if(responseJson.items){
        setEmployeeDashboardData(responseJson.items);
        props.EmployeeDashboardData(responseJson.items);
        }
      })

    getTimelineDashboard(user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson)
        setEmployeeTimelineDashboardData(responseJson.items);

        // props.MangerDashboardData(responseJson.items);

      })

  }, []);

  // console.log("34 EmployeeDashboardData", EmployeeDashboardData);

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <MyWidget
            className="card-stretch gutter-b"
            olpData={EmployeeDashboardData}
          />
        </div>
        <div className="col-lg-6 col-xxl-4">
          <ListsWidget9 className="card-stretch gutter-b" olpData={EmployeeTimelineDashboardData} />
        </div>
        <div className="col-lg-6 col-xxl-4">
          {/* <StatsWidget11
            className="card-stretch card-stretch-half gutter-b"
            symbolShape="circle"
            baseColor="success"
          /> */}
          {/* <StatsWidget12 className="card-stretch card-stretch-half gutter-b" /> */}
        </div>
      </div>
    </>
  );
};


const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { EmployeeDashboardData })(EmployeeDashboard);
