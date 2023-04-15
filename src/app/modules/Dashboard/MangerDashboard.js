import React, { useEffect, useState } from "react";
// import { MyWidget} from "../../_metronic/_partials/widgets/mixed/MyWidget";
import { MyWidgetDashboard } from "../../../_metronic/_partials/widgets/mixed/MyWidgetDashboard";
import { ListsWidget9 } from "../../../_metronic/_partials/widgets/lists/ListsWidget9";
import { StatsWidget11 } from "../../../_metronic/_partials/widgets/stats/StatsWidget11";
import { StatsWidget12 } from "../../../_metronic/_partials/widgets/stats/StatsWidget12";
import { connect } from "react-redux";
import { MangerDashboardData } from "./redux/action"

import { getManagerDash, getTimelineDashboard, getDashboardGraph } from "./redux/function";




function MangerDashboard(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  //   const dashboardData = {};
  const [EmployeeDashboardData, setEmployeeDashboardData] = useState([]);
  const [EmployeeTimelineDashboardData, setEmployeeTimelineDashboardData] = useState([]);
  const [EmployeeGraphDashboardData, setEmployeeGraphDashboardData] = useState({});

  useEffect(() => {
    getManagerDash(user)
      .then((response) => response.json()).then((responseJson) => {
        setEmployeeDashboardData(responseJson.items);

        props.MangerDashboardData(responseJson);

      })

    getTimelineDashboard(user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson)
        setEmployeeTimelineDashboardData(responseJson.items);

        // props.MangerDashboardData(responseJson.items);

      })
      getDashboardGraph(user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson);
        // console.log(Array.isArray(responseJson.items.x_axes) ? responseJson.items.x_axes.map(x => x) : [], "dddd")
        setEmployeeGraphDashboardData(Array.isArray(responseJson.items.x_axes) ? responseJson.items.x_axes.map(x => x) : []);
        // setEmployeeGraphDashboardData(responseJson.items);

        // props.MangerDashboardData(responseJson.items);

      })
  }, []);


  //console.log( EmployeeDashboardData);

  return (
    <>

      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <MyWidgetDashboard
            className="card-stretch gutter-b"
            olpData={EmployeeDashboardData}
          />
        </div>
        <div className="col-lg-6 col-xxl-4">
          <ListsWidget9 className="card-stretch gutter-b" olpData={EmployeeTimelineDashboardData} />
        </div>
        <div className="col-lg-6 col-xxl-4">
          <StatsWidget11
            className="card-stretch card-stretch-half gutter-b"
            symbolShape="circle"
            baseColor="success"
            olpData={EmployeeGraphDashboardData}
          />
          {/* <StatsWidget12 className="card-stretch card-stretch-half gutter-b" /> */}
        </div>
      </div>
    </>
  );
};

// export default MangerDashboard;
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { MangerDashboardData })(MangerDashboard);
