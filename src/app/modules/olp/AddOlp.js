import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addOlp, showUservalMentor, showPlatformById, showFocusareaById } from "./redux/functions";
import { OLPAdd, userValmentor } from "./redux/action";
import { connect, useDispatch } from 'react-redux';
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { uiActions } from "../../modules/Employee/redux/uiSlice";
import moment from 'moment';





function AddOlp(props) {
  const intialValues = { traningname: "", platform: "", courselink: "", focusarea: "", level: "", noofvideos: "", start_date: "", end_date: "", mentor: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formUserDropDown, setFormUserDropDown] = useState({});
  const [formPlatformDropDown, setPlatformDropDown] = useState({});
  const [formFocusareaDropDown, setFocusareaDropDown] = useState({});
  const [endDateMin, setEndDateMin] = useState([]);
  const dispatch = useDispatch();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [mentorName, setMentorName] = React.useState([]);
  //const [platformName, setPlatformName] = React.useState([]);
  // const { user: currentUser } = useSelector(
  //   (state: RootStateOrAny) => state.auth
  // );
  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(value);
  };

  const handleChangeDateEnd = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (e.target.value) {
      // console.log(e.target.value);
      setEndDateMin(moment(e.target.value).add(1, 'days').format("YYYY-MM-DD"));
    }

  };
  // console.log(endDateMin)

  // const handleChangePlatform = (e) => {

  //   const { name, value } = e.target;
  //   //setFormValues({ ...formValues, [name]: value });
  //   console.log(value);
  // };

  const user = JSON.parse(localStorage.getItem('user'));


  function handleChangeSelect(value) {
    if (value !== null) {
      const myoptions = value.map((id) => (
        id.value
      ))
      setMentorName(myoptions);
    } else {
      setMentorName([]);
    }
    //console.log('hello', mentorName);
  }

  // function handleChangeSelectPlatform(e) {
  //   const { name, value } = e.target;
  //   setPlatformName({ ...formValues, [name]: value });
  //   // if(value !==null){
  //   //   const myoptions = value.map((id) => (
  //   //     id.value
  //   //    ))
  //   //    setPlatformName(myoptions);
  //   // } else {
  //   //   setPlatformName([]);
  //   // }
  //   //console.log('hello', mentorName);
  // }

  //const notify = () => toast("Wow so easy!");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formOLPParams = {
      traningname: formValues.traningname,
      platform: formValues.platform,
      focus_area: formValues.focusarea,
      courselink: formValues.courselink,
      level: formValues.level,
      no_of_video: formValues.noofvideos,
      startdate: formValues.start_date,
      endate: formValues.end_date,
      mentor: mentorName,

    };
    console.log(formOLPParams, "add");
    setFormErrors(validate(formOLPParams));
    // console.log(Object.keys(validate(formOLPParams)).length);
    if (Object.keys(validate(formOLPParams)).length == 0) {
      console.log(6);

      addOlp({ formOLPParams }, user)
        .then((response) => response.json()).then((responseJson) => {

          if (responseJson.status_code === 200) {
            props.history.push('/olp-training')
            //console.log(responseJson, "users");
            props.OLPAdd(formOLPParams);
            dispatch(uiActions.showAddToaster("Added Successfully !"));
            //toast.success("OLP Added Succesfully");
          }
        })
      // .catch((err) => {
      //   toast.error("Some Thing Went Wrong");
      // });
    }



    //setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    console.log(values);
    if (!values.traningname) {
      errors.traningname = "Traning Name is required";
    }

    if (!values.platform) {
      errors.platform = "Platform is required";
    }

    if (!values.courselink) {
      errors.courselink = "Course Link is required";
    }

    if (!values.focus_area) {
      errors.focusarea = "FocusArea is required";
    }

    if (!values.level) {
      errors.level = "Level is required";
    }

    if (!values.no_of_video) {
      errors.noofvideos = "No of videos is required";
    }

    if (!values.endate) {
      errors.end_date = "Enddate is required";
    }

    if (!values.startdate) {
      errors.start_date = "Start Date is required";
    }

    if (values.mentor.length == 0) {
      errors.mentor = "Mentor is required";
    }
    //console.log(errors);
    return errors;
  };


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    loadUserdropdown();
    loadPlatformdropdown();
    loadFocusareadropdown();
  }, []);

  const loadUserdropdown = () => {
    showUservalMentor(user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson.items, 'res JNSO');
        // responseJson.items.map((id) => {
        //   console.log(id._id, id.email)

        // });
        //console.log(JSON.stringify(responseJson));
        setFormUserDropDown(responseJson.items);
        props.userValmentor(responseJson.items);

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });
  };

  const loadPlatformdropdown = () => {
    showPlatformById(user)
      .then((response) => response.json()).then((responseJson) => {

        setPlatformDropDown(responseJson.items);
        //props.userValmentor(responseJson.items);

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });
  };

  const loadFocusareadropdown = () => {
    showFocusareaById(user)
      .then((response) => response.json()).then((responseJson) => {

        setFocusareaDropDown(responseJson.items);
        //props.userValmentor(responseJson.items);

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });
  };


  const userList = Object.values(formUserDropDown).map((userVal) => {
    return {
      id: userVal._id,
      label: userVal.firstname + " " + userVal.lastname
    }
  }
  );
  const options = userList.map((id) => ({ value: id.id, label: id.label }));


  const platformList = Object.values(formPlatformDropDown).map((userVal) => {
    return {
      value: userVal._id,
      name: userVal.platform
    }
  }
  );

  const focusareaList = Object.values(formFocusareaDropDown).map((userVal) => {
    return {
      value: userVal._id,
      name: userVal.focus_area
    }
  }
  );
  // const optionsPlatfomr = platformList.map((id) => ({ value: id.value, label: id.name }));
  // console.log(platformList, "selectplatform" );





  return (

    <>
      <Card>
        <CardHeader title="ADD Training" />
        {/* <button onClick={notify}>Notify!</button>
        <ToastContainer /> */}
        <form onSubmit={handleSubmit} noValidate>
          {/* end::Header */}
          {/* begin::Form */}
          <div className="form">
            {/* begin::Body */}
            <div className="card-body">
              <div className="row">
                <label className="col-xl-3"></label>

              </div>

              {/* <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Traing Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Traning name"
                className={`form-control form-control-lg form-control-solid ` }
                name="traningname"
                value={formValues.traningname}
                onChange={handleChange}
                
              />
               {formErrors.traningname && (
                  <span className="text-danger">{formErrors.traningname}</span>
                )}
             
            </div>
          </div> */}

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Training Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Traning name"
                    className={`form-control form-control-lg form-control-solid `}
                    name="traningname"
                    value={formValues.traningname}
                    onChange={handleChange}

                  />
                  {formErrors.traningname && (
                    <span className="text-danger">{formErrors.traningname}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  PlatForm
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="platform" onChange={handleChange}

                  >
                    <option>Select Platform...</option>

                    {platformList.map((val, index) =>
                      <option key={index} value={val.name}>{val.name}</option>
                    )}


                  </select>

                  {formErrors.platform && (
                    <span className="text-danger">{formErrors.platform}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Course link
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Course Link"
                    className={`form-control form-control-lg form-control-solid `}
                    name="courselink"
                    value={formValues.courselink}
                    onChange={handleChange}

                  />
                  {formErrors.courselink && (
                    <span className="text-danger">{formErrors.courselink}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Focus Area
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="focusarea" onChange={handleChange}

                  >
                    <option>Select Focus Area...</option>
                    {focusareaList.map((val, index) =>
                      <option key={index} value={val.name}>{val.name}</option>
                    )}

                  </select>

                  {formErrors.focusarea && (
                    <span className="text-danger">{formErrors.focusarea}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Level
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="level" onChange={handleChange}

                  >
                    <option>Select Level...</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>

                  </select>
                  {formErrors.level && (
                    <span className="text-danger">{formErrors.level}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  No Of Videos
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="number"
                    placeholder="No Of Videos"
                    className={`form-control form-control-lg form-control-solid `}
                    name="noofvideos"
                    value={formValues.noofvideos}
                    onChange={handleChange}

                  />
                  {formErrors.noofvideos && (
                    <span className="text-danger">{formErrors.noofvideos}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Start date
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="date"
                    placeholder="Start date"
                    className={`form-control form-control-lg form-control-solid `}
                    name="start_date"
                    value={formValues.start_date}
                    onChange={handleChangeDateEnd}


                  />
                  {formErrors.start_date && (
                    <span className="text-danger">{formErrors.start_date}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  End date
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="date"
                    placeholder="End Date"
                    className={`form-control form-control-lg form-control-solid `}
                    name="end_date"
                    //value={formValues.end_date}
                    min={endDateMin}
                    onChange={handleChange}

                  />
                  {formErrors.end_date && (
                    <span className="text-danger">{formErrors.end_date}</span>
                  )}

                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Mentor
                </label>
                <div className="col-lg-9 col-xl-6">
                  <Select
                    closeMenuOnSelect={true}
                    isMulti
                    isClearable
                    name="mentor"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select Mentor"
                    //onChange={(val)=> {onChangeFunc({target: { name:'mentor', value: val.value }})}}
                    onChange={handleChangeSelect}
                  />
                  {formErrors.mentor && (
                    <span className="text-danger">{formErrors.mentor}</span>
                  )}

                </div>
              </div>
              <div className="card-toolbar">
                <button
                  type="submit"
                  className="btn btn-success mr-2"

                >
                  Save Changes
                  {/* <ToastContainer /> */}
                </button>

                <Link
                  to="/olp-training"
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
      </Card>
    </>
  );
};

//export default AddOlp;
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { OLPAdd, userValmentor })(AddOlp);
