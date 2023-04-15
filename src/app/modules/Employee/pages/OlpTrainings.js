import React, { useState, useRef, useEffect } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import { Button, Modal } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import {
  Route,
  Link,
  Switch,
  Router,
  BrowserRouter,
  useParams,
} from "react-router-dom";



import { useHistory } from "react-router-dom";
import { uiActions } from "../../../modules/Employee/redux/uiSlice";
import { Toast, Col, Row } from "react-bootstrap";
// import Toaster from "./components/Toaster";
import Toaster from "../../../modules/components/Toaster";

import { showTraining, showTrainingCompletedVideos } from "../redux/function";
import { TrainingShow } from "../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus
} from "@fortawesome/fontawesome-free-solid";
import { ToastContainer, toast } from "react-toastify";
import DataTable, { createTheme } from "react-data-table-component";
import { connect, RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { array } from "prop-types";
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      type="text"
      className="form-control"
      placeholder="Search Training"
      id="search"
      value={filterText}
      onChange={onFilter}
      style={{ height: 40, width: 250 }}
    ></input>
    <Button variant="danger" onClick={onClear}>
      Reset
    </Button>
  </>
);

const OlpTrainings = (props) => {
  const [trainingData, setTrainingData] = useState([]);
  const [trainingCompletedVideosData, setTrainingCompletedVideosData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const showValue = useSelector((state) => state.ui.showAddProgress);
  const toastShow = useSelector((state) => state.ui.showAddToast);
  const toastmsg = useSelector((state) => state.ui.toastMsg);
  const olptrainingss = useSelector((state) => state.Trainingreducer.data);

  const history = useHistory();

  const dispatch = useDispatch();

  const filteredItems = trainingData.filter(
    
    (item) =>
      (item.trainingName &&
        item.trainingName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.platform &&
        item.platform.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.focusArea &&
        item.focusArea.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.level &&
        item.level.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.noOfVideos &&
        item.noOfVideos.toLowerCase().includes(filterText.toLowerCase()))
  );
  //console.log(filteredItems);

  const user = JSON.parse(localStorage.getItem("user"));
  const empId = user.user._id;

  useEffect(() => {
    loadTrainigs();

  }, []);
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  // useEffect(() => {
  //   if (olptrainingss != undefined) {
  //     setTrainingData(olptrainingss);
  //   }
  // }, [olptrainingss]);

  const actions = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleShowProgress = (id) => {
    dispatch(uiActions.showModal(id));
    // const { id } = useParams;
    console.log("clicked on add", id);
  };
  // const loadTraningById = () =>{
  //   viewTrainingById(id, user)
  //     .then((response)  => {
  //       // .then((response) => response.json()).then((responseJson) => {

  //      console.log(response);
  //       //setSelectedValue(responseJson.items[0]);
  //       // setSelectedValue(Array.isArray(responseJson.items[0].mentor) ? responseJson.items[0].mentor.map(x => x._id) : []);
  //       // props.TrainingViewById(responseJson.items[0]);

  //     })

  // }

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

  const handleToasterClose = () => {
    dispatch(uiActions.hideAddToaster());
  };

  const loadTrainigs = () => {
    enableLoading();
    showTraining(empId)
      .then((response) => response.json())
      .then((responseJson) => {
        const tData = responseJson.items.map((mdata) => {
          return {
            id: mdata.training[0]._id,
            trainingName: mdata.training[0].trainingname,
            platform: mdata.training[0].platform,
            level: mdata.training[0].level,
            focusArea: mdata.training[0].focus_area,
            startdate: mdata.training[0].startdate,
            endate: mdata.training[0].endate,
            noOfVideos: mdata.training[0].no_of_video,
            duration:
              mdata.training[0].startdate + " to " + mdata.training[0].endate,
            mentor: mdata.mentor[0].firstname + " " + mdata.mentor[0].lastname,
            completedVideos: mdata.completed_videos,
          };
        });
        disableLoading();
        // console.log(tData);
        setTrainingData(tData);
        props.TrainingShow(tData);

      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
  };
  //var valconst = [];
  //   const loadTrainigsVideoCompleted = (row) => {
  //     showTrainingCompletedVideos(row,empId, user)
  //     .then((response) => response.json()).then((responseJson) => {
  //     //  console.log(responseJson.items[0].videos)
  //     return responseJson.items[0];
  //      // setTrainingCompletedVideosData(responseJson.items[0]);
  //       // props.TrainingShow(tData);

  //     })
  //     // console.log(valconst);
  //     return trainingCompletedVideosData;

  // };
  //   useEffect(() => {
  //     loadTrainigsVideoCompleted();
  //   }, []);


  // console.log(trainingData, "id");
  const duration = (row) => {
    // console.log(row);
    var startdate = new Date(row.startdate); //firstDate
    var endate = new Date(row.endate); //firstDate
    var diff = Math.abs(startdate - endate); //in milliseconds
    return diff / (1000 * 60 * 60 * 24);
  };

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
    // {
    //   name: "Completed Videos",
    //   // selector: (row) => row.completedVideos,
    //   cell: (row) => {loadTrainigsVideoCompleted(row.id)},
    //   sortable: false,
    // },
    {
      name: "Duration In days",
      cell: (row) => <>{duration(row)}</>,
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
          {/* {(() => {
            if (row.noOfVideos > row.completedVideos) {
              return ( */}
          <Link
            to={`/addprogress/` + row.id}
            className="btn btn-outline-info btn-sm"
            title="Add Progress"
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </Link>
          {/* )

            }
          })()} */}


          &nbsp;
          <Link
            to={`/viewprogress/` + row.id}
            className="btn btn-outline-info btn-sm"
            title="View Progress"
          >
            <FontAwesomeIcon icon={faEye} size="sm" />
          </Link>
        </>
      ),
      sortable: false,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <Card>
        <CardHeader title="My Training List" />

        <Switch>
          {/* <ContentRoute path="/olptraining" component={OlpTrainingProgress} /> */}
          {/* <Route path="/olptraining" component={EmployeeTraining} /> */}
          return (
          <>
            <div className="dashboard">
              <div className="smartphone-menu-trigger" />
              {toastShow && (
                <Toaster
                  show={toastShow}
                  close={handleToasterClose}
                  bgcolor="#1bc5bd"
                  txtcolor="white"
                />
              )}
              <main>
                <div className="main-sec">
                  <div className="container-fluid">
                    <div className="mainsec-content">
                      <div className="table-responsive">
                        <DataTable
                          // title="My training list"
                          columns={columns}
                          order="desc"
                          className="dashboard-table"
                          pagination
                          // data={trainingData}
                          data={filteredItems}
                          // paginationResetDefaultPage={resetPaginationToggle}
                          // optionally, a hook to reset pagination to page 1
                          actions={actions}
                          persistTableHead
                        // paginationComponentOptions={
                        //   paginationComponentOptions
                        // }
                        />
                        {loading && <div className="spinner spinner-primary spinner-lg spinner-center"></div>}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </>
          );
        </Switch>
      </Card>
    </>
  );
};

// export default OlpTrainings;
const mapStateToProps = (formValues) => ({
  intialValues: formValues,
});
export default connect(mapStateToProps, { TrainingShow })(OlpTrainings);
