import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../_metronic/_partials/controls";
// import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faPlus } from "@fortawesome/fontawesome-free-solid";

import { Button, Modal } from "react-bootstrap";
import AddProgress from "./AddProgress";
import ViewProgress from "./ViewProgress";
import { Route, Link, Switch, Router, BrowserRouter } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { uiActions } from "../../../modules/Employee/redux/uiSlice";

import { useDispatch, useSelector } from "react-redux";
import { Toast, Col, Row } from "react-bootstrap";
import Toaster from "./components/Toaster";
import useHttp from "../hooks/use-http";
import { showTrainings } from "../api/api";


export const EmployeeTraining = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { sendRequest, status, data: loadedTraining, error } = useHttp(
    showTrainings,
    true
  );
  const empId = user.user._id;
  useEffect(() => {
    sendRequest(empId);
  }, [empId, sendRequest]);



  console.log('58', loadedTraining);

  const dispatch = useDispatch();
  const showValue = useSelector((state) => state.ui.showAddProgress);
  const toastShow = useSelector((state) => state.ui.showAddToast);
  const history = useHistory();

  const handleToasterClose = () => {
    dispatch(uiActions.hideAddToaster());
  };

  const showViewModal = useSelector((state) => state.employees.showViewProgreess);


  const handleShowProgress = () => {
    dispatch(uiActions.showModal());
    console.log("clicked on add", showValue);
  };
  const handleClose = () => {
    dispatch(uiActions.hideModal());
    history.goBack("/olptraining");
  };

  const handleViewProgress = (id) => {
    dispatch(uiActions.showViewModal());
  };

  const viewProgressClose = () => {
    dispatch(uiActions.hideViewModal());
    history.goBack(`/olptraining`);
  };


  //const classes = useStyles();

  const columns = [
    {
      name: "Training Name",
      selector: (row) => row.trainingName,
      sortable: true,
    },
    {
      name: "Platform",
      selector: (row) => row.platform,
      sortable: true,
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
    },
    {
      name: "Focus Area",
      selector: (row) => row.focusArea,
      sortable: true,
    },
    {
      name: "Videos",
      selector: (row) => row.noOfVideos,
      sortable: true,
    },
    {
      name: "Completed Videos",
      selector: (row) => row.completedVideos,
      sortable: false,
    },
    {
      name: "Duaration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Mentor",
      selector: (row) => row.mentor,
      sortable: false,
    },
    {
      name: "Actions",

      cell: (row) => (
        <>
          <Link
            className="btn btn-outline-success btn-sm"
            title="Add"
            to={`/olptraining/add/` + row.id}
            onClick={handleShowProgress}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </Link>
          &nbsp;
          <Link
            className="btn btn-outline-info btn-sm"
            title="View"
            to={`/olptraining/view/` + row.id}
            onClick={handleViewProgress}
          >
            <FontAwesomeIcon icon={faEye} size="sm" />
          </Link>
          <Switch>
            <Route exact path={`/olptraining/add/:id`}>
              <AddProgress onHide={handleClose} />
            </Route>
            <Route exact path={`/olptraining/view/:id`}>
              <ViewProgress onHide={viewProgressClose} />
            </Route>
          </Switch>
        </>
      ),
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const data = [
    {
      id: 1,
      trainingName: "OLP",
      platform: "udemy",
      level: "100",
      focusArea: "node",
      noOfVideos: "70",
      duration: "2nd Oct. 2021 to 31st Dec. 2021",
      mentor: "Vikash",
      completedVideos: "20",
    },
    {
      id: 2,
      trainingName: "OLP",
      platform: "cloud",
      level: "200",
      focusArea: "React",
      noOfVideos: "170",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Rohit ",
      completedVideos: "60",
    },
    {
      id: 3,
      trainingName: "OLP",
      platform: "udemy",
      level: "100",
      focusArea: "node",
      noOfVideos: "70",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Vikash",
      completedVideos: "20",
    },
    {
      id: 4,
      trainingName: "OLP",
      platform: "cloud",
      level: "200",
      focusArea: "React",
      noOfVideos: "170",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Rohit ",
      completedVideos: "60",
    },
    {
      id: 5,
      trainingName: "OLP",
      platform: "udemy",
      level: "100",
      focusArea: "node",
      noOfVideos: "70",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Vikash",
      completedVideos: "20",
    },
    {
      id: 6,
      trainingName: "OLP",
      platform: "cloud",
      level: "200",
      focusArea: "React",
      noOfVideos: "170",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Rohit ",
      completedVideos: "60",
    },
    {
      id: 7,
      trainingName: "OLP",
      platform: "udemy",
      level: "100",
      focusArea: "node",
      noOfVideos: "70",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Vikash",
      completedVideos: "20",
    },
    {
      id: 8,
      trainingName: "OLP",
      platform: "cloud",
      level: "200",
      focusArea: "React",
      noOfVideos: "170",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Rohit ",
      completedVideos: "60",
    },
    {
      id: 9,
      trainingName: "OLP",
      platform: "udemy",
      level: "100",
      focusArea: "node",
      noOfVideos: "70",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Vikash",
      completedVideos: "20",
    },
    {
      id: 10,
      trainingName: "OLP",
      platform: "cloud",
      level: "200",
      focusArea: "React",
      noOfVideos: "170",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Rohit ",
      completedVideos: "60",
    },
    {
      id: 11,
      trainingName: "OLP",
      platform: "cloud",
      level: "200",
      focusArea: "React",
      noOfVideos: "170",
      duration: "1st Oct. 2021 to 31st Dec. 2021",
      mentor: "Rohit ",
      completedVideos: "60",
    },
  ];
  const tableData = {
    columns,
    data,
  };
  return (
    <div className="main">
      {toastShow && (
        <Toaster
          show={toastShow}
          close={handleToasterClose}
          bgcolor="#1BC5BD"
          txtcolor="white"
          bodyMsg="Added successfuly.!"
        />
      )}
      <DataTableExtensions {...tableData} print={false} export={false}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
};
