import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addRight, showModel } from "./redux/functions";
import { RightAdd, userValmentor } from "./redux/action";
import { connect, useDispatch } from 'react-redux';
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { uiActions } from "../Employee/redux/uiSlice";
import moment from 'moment';


function AddRight(props) {
  const intialValues = { name: "", moduleID: "", status: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [modelDropDown, setModelDropDown] = useState({});
  const dispatch = useDispatch();
  const [mentorName, setMentorName] = React.useState([]);
  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formRightParams = {
      name: formValues.name,
      moduleID: formValues.moduleID,
      status: formValues.status,


    };
    setFormErrors(validate(formRightParams));
    if (Object.keys(validate(formRightParams)).length == 0) {
      addRight({ formRightParams }, user)
        .then((response) => response.json()).then((responseJson) => {
          if (responseJson.status_code === 200) {
            props.history.push('/rights')
            props.RightAdd(formRightParams);
            dispatch(uiActions.showAddToaster("Added Successfully !"));
          }
        })
      // .catch((err) => {
      //   toast.error("Some Thing Went Wrong");
      // });
    }

  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Rights Name is required";
    }

    if (!values.moduleID) {
      errors.moduleID = "Module is required";
    }

    if (!values.status) {
      errors.status = "Status is required";
    }
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
    loadModeldropdown();
  }, []);

  const loadModeldropdown = () => {
    showModel(user)
      .then((response) => response.json()).then((responseJson) => {
        setModelDropDown(responseJson.items);
        // props.userValmentor(responseJson.items);

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
        <CardHeader title="ADD Right" />
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
                    value={formValues.name}
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
                    name="moduleID" onChange={handleChange}
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
                  Status
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="status" onChange={handleChange}>
                    <option value="">Select Status...</option>
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
                  {/* <ToastContainer /> */}
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

//export default AddRight;
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { RightAdd, userValmentor })(AddRight);
