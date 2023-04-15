import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editRight, showRightById, showModel } from "./redux/functions";
import { RightEdit, ShowRightById } from "./redux/action";
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import {
  Card,
  CardHeader,
} from "../../../_metronic/_partials/controls";
import Toaster from "../components/Toaster";
import { uiActions } from "../Employee/redux/uiSlice";


function EditRight(props) {

  const intialValues = { name: "", moduleID: "", status: "", slug: "slug" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [modelDropDown, setModelDropDown] = useState({});
  const [formValbyid, setFormvalbyid] = useState({});
  const [selectedValue, setSelectedValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [mentorName, setMentorName] = React.useState([]);
  const dispatch = useDispatch();
  let { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormvalbyid({ ...formValbyid, [name]: value });

    // setShowRights({ rights: e.target })
  };

  function handleChangeSelect(value) {
    if (value !== null) {
      const myoptions = value.map((id) => (
        id.value
      ))
      setMentorName(myoptions);
      setSelectedValue(myoptions);
    } else {
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
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Rights Name is required";
    }
    if (!values.moduleID) {
      errors.moduleID = "Module is required";
    }
    if (parseInt(!values.status)) {
      errors.status = "Status is required";
    }
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formRightParams = {
      name: formValbyid.name,
      moduleID: formValbyid.moduleID,
      status: formValbyid.status,
      slug: "slug"
    };
    setFormErrors(validate(formRightParams));
    if (Object.keys(validate(formRightParams)).length == 0) {
      editRight({ formRightParams }, id, user)
        .then((response) => response.json()).then((responseJson) => {
          if (responseJson.status_code === 200) {
            props.history.push('/rights')
            props.RightEdit(formRightParams);
            dispatch(uiActions.showAddToaster("Updated Successfully !"));
          }
        })
      // .catch((err) => {
      //   toast.error("Please enter valid field");
      // });
    }
    //setIsSubmitting(true);
  };
  useEffect(() => {
    loadRightById();
  }, []);

  const loadRightById = () => {
    enableLoading();
    showRightById(id, user)
      .then((response) => response.json()).then((responseJson) => {
        setSelectedValue(Array.isArray(responseJson.items[0].moduleID) ? responseJson.items[0].moduleID.map(x => x._id) : []);
        props.ShowRightById(responseJson.items[0]);
        disableLoading();

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });

  };
  const editusers = useSelector(state => state.Rightreducer.data);
  useEffect(() => {
    if (editusers != undefined) {
      setFormvalbyid(editusers)
    }
  }, [editusers]);


  useEffect(() => {
    loadModeldropdown();
  }, []);

  const loadModeldropdown = () => {
    showModel(user)
      .then((response) => response.json()).then((responseJson) => {
        setModelDropDown(responseJson.items);
      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });
  };

  const modelList = Object.values(modelDropDown).map((userVal) => {
    return {
      id: userVal._id,
      name: userVal.name
    }
  }
  );
  return (

    <>
      <Card>
        <CardHeader title="Edit Right" />
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
                  Rights Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Rights Name"
                    className={`form-control form-control-lg form-control-solid `}
                    name="name"
                    value={formValbyid.name || ''}
                    onChange={handleChange}

                  />
                  {formErrors.name && (
                    <span className="text-danger">{formErrors.name}</span>
                  )}

                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Module
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="moduleID" value={formValbyid.moduleID} onChange={handleChange}
                  >
                    <option value="">Select Model...</option>
                    {modelList.map((val, index) =>
                      <option key={index} value={val.id}>{val.name}</option>
                    )}
                  </select>

                  {formErrors.moduleID && (
                    <span className="text-danger">{formErrors.moduleID}</span>
                  )}

                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  isActive
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="status" value={formValbyid.status} onChange={handleChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                  {formErrors.status && (
                    <span className="text-danger">{formErrors.status}</span>
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
                  to="/rights"
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
export default connect(mapStateToProps, { RightEdit, ShowRightById })(EditRight);