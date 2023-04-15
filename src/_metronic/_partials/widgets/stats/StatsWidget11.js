/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect, useState } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../../layout";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getDashboardGraph } from "../../../../app/modules/Dashboard/redux/function";
//import {SelectGroup} from "react-bootstrap4-form-validation";

export function StatsWidget11({ className, symbolShape, baseColor }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [EmployeeGraphDashboardData, setEmployeeGraphDashboardData] = useState({});
  useEffect(() => {
    getDashboardGraph(user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson);
        // console.log(Array.isArray(responseJson.items.x_axes) ? responseJson.items.x_axes.map(x => x) : [], "dddd")
        // setEmployeeGraphDashboardData(Array.isArray(responseJson.items.y_axes) ? responseJson.items.y_axes.map(x => x) : []);
        setEmployeeGraphDashboardData(responseJson.items);

        // props.MangerDashboardData(responseJson.items);

      })
  }, []);
  console.log(EmployeeGraphDashboardData)
  const options = {
    title: {
      text: 'Monthly Completed Videos Counts'
    },

    xAxis: {
      categories: EmployeeGraphDashboardData.x
    },
    yAxis: [{
      allowDecimals: false,
      title: {
        text: 'Hours'
      }
    }],

    credits: {
      enabled: false
    },

    series: [{
      type: 'column',
      data: EmployeeGraphDashboardData.y,
      name: 'Videos Completed'
    }]
  }

  // const options = {
  //   title: {
  //     text: 'Trainings Chart'
  //   },
  //   labels: {
  //     enabled: false
  // },
  //   // The types are 'linear', 'logarithmic' and 'datetime'
  //   yAxis: {
  //     type: 'linear',
  //   },
  //   // Categories are set by using an array
  //   xAxis: {
  //     // categories: ['Apples', 'Bananas', 'Oranges', 'Grapes']
  //     categories: EmployeeGraphDashboardData.y_axes,
  //     labels: {
  //       autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90]
  //   }

  //   },
  //   credits: {
  //     enabled: false
  // },
  //   series: [{
  //     type: 'bar',
  //     name: 'Trainings',
  //     // data: [''],
  //     data: EmployeeGraphDashboardData.x_axes
  //     // data: [1, 2, 3]
  //   }]
  // }
  return (
    <div className={`card card-custom ${className}`} style={{ height: "600px" }}>
      <div className="card-body p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <span
            className={`symbol ${symbolShape} symbol-50 symbol-light-${baseColor} mr-2`}
          >
            {/* <span className="symbol-label">
              <span className={`svg-icon svg-icon-xl svg-icon-${baseColor}`}>
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Layout/Layout-4-blocks.svg"
                  )}
                ></SVG>
              </span>
            </span> */}
          </span>
          {/* <div className="d-flex flex-column text-right">
            <span className="text-dark-75 font-weight-bolder font-size-h3">
              750$
            </span>
            <span className="text-muted font-weight-bold mt-2">
              Weekly Income
            </span>
          </div> */}
        </div>
        <div
          id="kt_stats_widget_11_chart"
          className="card-rounded-bottom"
          style={{ height: "350px" }}
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}


