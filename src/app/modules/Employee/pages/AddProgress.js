import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Card, CardHeaderToolbar, CardBody, CardHeader, Input, CardFooter } from "../../../../_metronic/_partials/controls";
import { ToastContainer } from "react-toastify";

import { viewTrainingById, addTrainingProgress, showTrainingCompletedVideos } from "../redux/function";
import { OLPPROGRESSAdd, OLPPROGRESSLoad } from "../redux/action";
import Select from "react-select";
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import { uiActions } from "../../../modules/Employee/redux/uiSlice";




function AddProgress(props) {
  let { id } = useParams()
  //console.log(id, "id");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const intialValues = { completedvideo: "", start_week: "", end_week: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formUserDropDown, setFormUserDropDown] = useState({});
  const [mentorName, setMentorName] = React.useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedValueVideo, setSelectedValueVideo] = useState([]);
  const [endLastWeek, setLastWeek] = useState([]);
  const [setMaxDate, setmaxDateVal] = useState([]);
  const [setBeforedate, setBeforedateVal] = useState({});
  const [showSpan, setshowSpan] = useState(false);
  const [showSpanEndWeek, setshowSpanEndWeekVal] = useState(false);
  const [formValbyDate, setFormvalbyDate] = useState({});
  const [trainingCompletedVideosData, setTrainingCompletedVideosData] = useState([]);
  const dispatch = useDispatch();
  const userList = Object.values(formUserDropDown).map((userVal) => {
    console.log("abc", userVal);
    return {
      id: userVal._id,
      label: userVal.email
    }
  }
  );
  const options = userList.map((id) => ({ value: id.id, label: id.label }));

  const backToOlpTrining = () => {
    props.history.push(`/olp-training`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };



  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataprogress = {
      start_week: formValues.start_week,
      end_week: setMaxDate,
      completedvideo: formValues.completedvideo,
    };
    console.log(formDataprogress, "add");
    setFormErrors(validate(formDataprogress));

    if (Object.keys(validate(formDataprogress)).length == 0) {
      //   console.log(6);

      addTrainingProgress({ id }, formDataprogress, user)
        // .then((response)=> {
        .then((response) => response.json()).then((responseJson) => {

          if (responseJson.status_code === 200) {
            props.history.push('/my-training')
            console.log(responseJson, "users");
            props.OLPPROGRESSAdd(formDataprogress);
            //     //toast.success("OLP Added Succesfully");
            dispatch(uiActions.showAddToaster("Addded Successfully !"));
          }
        })

    }
  }

  const validate = (values) => {
    let errors = {};

    // console.log(JSON.parse(values), "validate");
    // console.log(values.end_week.length, "validate");

    if (!values.start_week) {
      errors.start_week = "Start Week is required";
    }
    if (values.end_week.length === 0) {
      errors.end_week = "End Week is required";
    }
    if (!values.completedvideo) {
      errors.completedvideo = "Videos is required";
    }
    console.log(errors);
    return errors;
  };

  useEffect(() => {
    loadTrainingProgress();
    loadTrainigsVideoCompleted();
  }, []);

  const loadTrainingProgress = () => {
    viewTrainingById(id, user)
      // .then((response)  => {
      .then((response) => response.json()).then((responseJson) => {

        //console.log(responseJson.items);
        setSelectedValue(responseJson.items.dashboardData[0].training[0]);
        setMentorName(responseJson.items.dashboardData[0].mentor[0]);
        setSelectedValueVideo(responseJson.items.dashboardData[0])
        // setLastWeek(responseJson.items.end_week);
        //setBeforedateVal(dataLastDate.toString().split("T")[0])
        props.OLPPROGRESSLoad(responseJson.items.end_week)

        // setSelectedValue(Array.isArray(responseJson.items[0].mentor) ? responseJson.items[0].mentor.map(x => x._id) : []);
        // props.TrainingViewById(responseJson.items[0]);

      })

  };

  const loadTrainigsVideoCompleted = () => {
    showTrainingCompletedVideos(id, user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson.items)
        // return responseJson.items[0];
        if (responseJson.items) {
          setTrainingCompletedVideosData(responseJson.items.dashboardData[0].videos);
          setLastWeek(responseJson.items.end_week);
        }
        // props.TrainingShow(tData);

      })
    // // console.log(valconst);
    // return trainingCompletedVideosData;

  };


  // const dataLastDate = useSelector(state => state.Trainingreducer.data);

  useEffect(() => {
    //console.log(dataLastDate);
    if (endLastWeek) {
      setBeforedateVal(endLastWeek.toString().split("T")[0])
    }

  }, [endLastWeek]);

  //const currdate = moment(new Date()).format('YYYY-MM-DD');
  // console.log();

  // if (endLastWeek) {
  //   setBeforedateVal(endLastWeek.toString().split("T")[0]);
  //   //setBeforedateVal(endLastWeek)
  // } else {
  //   console.log(7);
  //   //setBeforedateVal(moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'))
  // }
  //console.log(dataLastDate);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const startDateVal = moment(state[0].startDate).format('MM-DD-YYYY');
  const endDateval = moment(state[0].endDate).format('MM-DD-YYYY');

  const duration = () => {
    var startdate = new Date(selectedValue.startdate) //firstDate
    var endate = new Date(selectedValue.endate) //firstDate
    var diff = Math.abs(startdate - endate); //in milliseconds
    return diff / (1000 * 60 * 60 * 24);
  };
  //console.log(selectedValue, "val");
  const validationVideo = (event) => {

    let totalvideos = selectedValue.no_of_video;
    let compltedtotalvideos = trainingCompletedVideosData;
    let videFinal = totalvideos - compltedtotalvideos;

    let videoNo = event.target.value;
    // console.log(videFinal, Number(videoNo));
    //console.log(totalvideos,videoNo);
    if (videFinal < Number(videoNo)) {
      // alert("No Of complted videos should be less that total video");
      setshowSpan(true);
      event.target.value = "";
    } else {
      setshowSpan(false);
    }

  }


  //const maxweekdate = "";
  const handleChangeDate = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormvalbyDate({ ...formValbyDate, [name]: value });

    //console.log(formValues.end_week);
    if (e.target.value) {
      var maxweekdate = moment(e.target.value).add(7, 'days').format('YYYY-MM-DD')
      setmaxDateVal(maxweekdate);
      // setshowSpanEndWeekVal(false);
    }
    else {
      this.formValues.end_week = "";
    }
  };
  const checkStartDate = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues.start_week)
    if (formValues.start_week) {
      setshowSpanEndWeekVal(false);

    } else {
      e.target.value = "";
      setshowSpanEndWeekVal(true);

    }
  }
  //console.log(setMaxDate);

  return (
    <>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit} noValidate>

            {/* begin::Header */}
            <div className="card-header py-3">
              <div className="card-title align-items-start flex-column">
                <h3 className="card-label font-weight-bolder text-dark">
                  Add Progress
                </h3>

              </div>

            </div>
            {/* end::Header */}
            {/* begin::Form */}
            <div className="form">
              {/* begin::Body */}
              <div className="card-body">
                <div className="row">
                  <label className="col-xl-3"></label>

                </div>


                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Training Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="Traning name"
                      className={`form-control form-control-lg form-control-solid `}
                      // name="traningname"
                      value={selectedValue.trainingname || ""}
                      onChange={handleChange}
                      readOnly

                    />


                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Focus Area
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="Focus Area"
                      className={`form-control form-control-lg form-control-solid `}
                      value={selectedValue.focus_area || ""}
                      onChange={handleChange}
                      readOnly

                    />


                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Duration
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="Duration"
                      className={`form-control form-control-lg form-control-solid `}

                      value={duration() + "Days" || ""}
                      onChange={handleChange}
                      readOnly

                    />


                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Mentor
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    {/* <span className={`form-control form-control-lg form-control-solid ` }>
                {mentorName}
                </span> */}
                    <input
                      type="text"
                      placeholder="Mentor"
                      className={`form-control form-control-lg form-control-solid `}

                      value={mentorName.firstname + " " + mentorName.lastname || ""}
                      onChange={handleChange}
                      readOnly


                    />


                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Total Videos
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="No Of Videos"
                      className={`form-control form-control-lg form-control-solid `}

                      value={selectedValue.no_of_video || ""}
                      onChange={handleChange}
                      readOnly

                    />

                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Videos Complete Till Date
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="No Of Videos"
                      className={`form-control form-control-lg form-control-solid `}

                      value={trainingCompletedVideosData || ""}
                      onChange={handleChange}
                      readOnly

                    />

                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Start Week
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="date"
                      placeholder="Start Week"
                      className={`form-control form-control-lg form-control-solid `}
                      name="start_week"
                      //value={setBeforedate}
                      min={setBeforedate ? moment(setBeforedate).add(1, 'days').format("YYYY-MM-DD") : moment(new Date()).format('YYYY-MM-DD')}
                      onChange={handleChangeDate}

                    />
                    {formErrors.start_week && (
                      <span className="text-danger">{formErrors.start_week}</span>
                    )}

                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    End Week
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="date"
                      placeholder="End date"
                      className={`form-control form-control-lg form-control-solid `}
                      name="end_week"
                      value={setMaxDate || ""}
                      min={setMaxDate}
                      max={setMaxDate}
                      //onKeyUp={checkStartDate}
                      onChange={checkStartDate}

                    />
                    <span className="text-danger" style={{ display: showSpanEndWeek ? 'block' : 'none' }}>Please Enter Start Week</span>
                    {formErrors.end_week && (
                      <span className="text-danger">{formErrors.end_week}</span>
                    )}

                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Nos Of Completed Video
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    {/* <span className={`form-control form-control-lg form-control-solid ` }>
                {mentorName}
                </span> */}
                    <input
                      type="number"
                      placeholder="No Of Completed video"
                      className={`form-control form-control-lg form-control-solid `}
                      name="completedvideo"
                      //value={mentorName || ''}
                      onChange={handleChange}
                      onKeyUp={validationVideo}


                    />
                    <span className="text-danger" style={{ display: showSpan ? 'block' : 'none' }}>No Of complted videos should be less that total video</span>
                    {formErrors.completedvideo && (
                      <span className="text-danger">{formErrors.completedvideo}</span>
                    )}


                  </div>
                </div>




                <div className="card-toolbar">
                  {(() => {
                    if (selectedValue.no_of_video > trainingCompletedVideosData) {
                      return (
                        <button
                          type="submit"
                          className="btn btn-success mr-2"

                        >
                          Save Changes

                        </button>
                      )

                    } else {
                      return (
                        <span className="btn btn-warning mr-2">Videos Completed</span>

                      )
                    }
                  })()}


                  <Link
                    to="/my-training"
                    className="btn btn-secondary"
                  >
                    Cancel
                  </Link>
                </div>

              </div>
              {/* end::Body */}
            </div>
            {/* end::Form */}

          </form>
        </CardBody>
      </Card>
    </>
  )
}
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, {
  OLPPROGRESSAdd, OLPPROGRESSLoad
})(AddProgress);