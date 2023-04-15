import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editOlp, showOlpById, showUservalMentor, showPlatformById, showFocusareaById } from "./redux/functions";
import { OLPEdit, ShowOLPById } from "./redux/action";
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import Toaster from "../../modules/components/Toaster";
import { uiActions } from "../../modules/Employee/redux/uiSlice";
import moment from 'moment';




function EditOlp(props) {

  const intialValues = { trainingname: "", platform: "", courselink: "", focusarea: "", level: "", noofvideos: "", startdate: "", endate: "", mentor: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formValbyid, setFormvalbyid] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [mentorName, setMentorName] = React.useState([]);
  const [formUserDropDown, setFormUserDropDown] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [formPlatformDropDown, setPlatformDropDown] = useState({});
  const [formFocusareaDropDown, setFocusareaDropDown] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const { user: currentUser } = useSelector(
  //   (state: RootStateOrAny) => state.auth
  // );
  let { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('41', selectedValue)
  //console.log(id);
  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormvalbyid({ ...formValbyid, [name]: value });
    //console.log(value);
  };

  function handleChangeSelect(value) {
    console.log('38', value)
    if (value !== null) {
      //  console.log(6);
      const myoptions = value.map((id) => (
        id.value
      ))
      //console.log(myoptions, "options");
      setMentorName(myoptions);
      setSelectedValue(myoptions);
    } else {
      console.log(7);
      setMentorName([]);
      setSelectedValue([]);
    }

  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  //console.log('hello', mentorName, selectedValue);
  //const notify = () => toast("Wow so easy!");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formOLPEditParams = {
      trainingname: formValbyid.trainingname,
      platform: formValbyid.platform,
      focus_area: formValbyid.focus_area,
      courselink: formValbyid.courselink,
      level: formValbyid.level,
      no_of_video: formValbyid.no_of_video,
      startdate: formValbyid.startdate,
      endate: formValbyid.endate,
      mentor: selectedValue,

    };
    // console.log(formOLPEditParams, "sendpost");
    setFormErrors(validate(formOLPEditParams));
    console.log(validate(formOLPEditParams), Object.keys(validate(formOLPEditParams)).length, selectedValue, "error");
    console.log(Object.keys(validate(formOLPEditParams)).length)
    if (Object.keys(validate(formOLPEditParams)).length == 0) {
      //console.log(55);
      editOlp({ formOLPEditParams }, id, user)
        .then((response) => response.json()).then((responseJson) => {
          //console.log(responseJson, "olpdata");
          if (responseJson.status_code === 200) {
            props.history.push('/olp-training')
            props.OLPEdit(formOLPEditParams);
            dispatch(uiActions.showAddToaster("Updated Successfully !"));
          }
        })
        .catch((err) => {
          toast.error("Please enter valid field");
        });
    }



    //setIsSubmitting(true);
  };
  useEffect(() => {
    loadOlpById();
    loadUserdropdown();
    loadPlatformdropdown();
    loadFocusareadropdown();
  }, []);

  const loadOlpById = () => {
    enableLoading();
    showOlpById(id, user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson.items[0].mentor, 'res JNSO');

        // responseJson.items[0].mentor.map((val) => {
        //   //console.log(val.firstname, "array")
        //   setSelectedValue(val._id);
        // });
        //      console.log(responseJson.items[0].mentor, "testarry");
        setSelectedValue(Array.isArray(responseJson.items[0].mentor) ? responseJson.items[0].mentor.map(x => x._id) : []);
        props.ShowOLPById(responseJson.items[0]);
        disableLoading();

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });

  };
  //console.log(selectedValue, "finalaryh");



  const olpeditusers = useSelector(state => state.Olpreducer.data);
  useEffect(() => {
    if (olpeditusers != undefined) {
      setFormvalbyid(olpeditusers)
    }

  }, [olpeditusers]);


  // console.log(formValbyid);
  const linkButton = () => {
    props.history.push('/olp')
  };

  const validate = (values) => {
    console.log('159', values);
    let errors = {};

    // console.log(values, "valueValidate");
    if (!values.trainingname) {
      errors.trainingname = "Traning Name is required";
    }

    if (!values.platform) {
      errors.platform = "Platform is required";
    }

    if (!values.courselink) {
      errors.courselink = "Course Link is required";
    }

    if (!values.focus_area) {
      errors.focus_area = "FocusArea is required";
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
    // else if(values.mentor.length == 0){
    //   errors.mentor = "Mentor is required2";
    // }
    // console.log(values, "validate");
    return errors;
  };
  const loadUserdropdown = () => {
    showUservalMentor(user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson.items, 'res JNSO');
        // responseJson.items.map((id) => {
        //   console.log(id._id, id.email)

        // });
        //console.log(JSON.stringify(responseJson));
        setFormUserDropDown(responseJson.items);
        //props.userValmentor(responseJson.items);

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
    // Ideally you can change the value to something different that is easier to keep track of like the UTC offset
    //console.log(userVal, "kkk");
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
  // console.log(options, "options" );
  return (

    <>
      <Card>
        <CardHeader title="Edit Training" />
        {loading && <div className="spinner spinner-primary spinner-lg spinner-center"></div>}
        <form onSubmit={handleSubmit} noValidate>


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
                    name="trainingname"
                    value={formValbyid.trainingname || ''}
                    onChange={handleChange}

                  />
                  {formErrors.trainingname && (
                    <span className="text-danger">{formErrors.trainingname}</span>
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
                    name="platform" value={formValbyid.platform} onChange={handleChange}

                  >
                    {/* <option value="">Select Platform...</option> */}
                    {platformList.map((val, index) =>
                      <option key={index} value={val.name}>{val.name}</option>
                    )}
                    {/* <option value="AWS">AWS</option>
                <option value="PHP">PHP</option>
                <option value="Dot-not">.Net</option> */}

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
                    value={formValbyid.courselink || ''}
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
                    name="focus_area" value={formValbyid.focus_area} onChange={handleChange}

                  >

                    {/* <option value=""></option> */}
                    {focusareaList.map((val, index) =>
                      <option key={index} value={val.name}>{val.name}</option>
                    )}
                    {/* <option value="">Select Focus Area</option>
               {focusareaList.map((val) => 
                  <option value={val.name}>{val.name}</option>
                )}
                 */}
                  </select>
                  {formErrors.focus_area && (
                    <span className="text-danger">{formErrors.focus_area}</span>
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
                    name="level" value={formValbyid.level} onChange={handleChange}

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
                    type="text"
                    placeholder="No Of Videos"
                    className={`form-control form-control-lg form-control-solid `}
                    name="no_of_video"
                    value={formValbyid.no_of_video || ''}
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
                    name="startdate"
                    value={formValbyid.startdate || ''}
                    onChange={handleChange}

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
                    name="endate"
                    value={formValbyid.endate || ''}
                    min={moment(formValbyid.startdate).add(1, 'days').format('YYYY-MM-DD')}
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
                    classNamePrefix="select"
                    //value={options.find(obj => obj.value === "624af557de761807e453c187")}
                    value={options.filter(obj => selectedValue.includes(obj.value))} // set selected values


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
                  <ToastContainer />
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
export default connect(mapStateToProps, { OLPEdit, ShowOLPById })(EditOlp);
