import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { addPlatform } from "../platform/redux/functions";
import { PlatformAdd } from "../platform/redux/action";
import { connect, useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { uiActions } from "../../../modules/Employee/redux/uiSlice";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";

function AddPlatform(props) {
  const intialValues = { platform: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  // const [formUserDropDown, setFormUserDropDown] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [mentorName, setMentorName] = React.useState([]);
  // const { user: currentUser } = useSelector(
  //   (state: RootStateOrAny) => state.auth
  // );
  const user = JSON.parse(localStorage.getItem('user'));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(value);
  };
  //const notify = () => toast("Wow so easy!");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formPlatformParams = {
      platform: formValues.platform

    };
    //console.log(formOLPParams);
    setFormErrors(validate(formValues));
    addPlatform({ formPlatformParams }, user)
      .then((response) => response.json()).then((responseJson) => {
        if (responseJson.status_code === 200) {
          props.history.push('/platform')
          console.log(responseJson, "users");
          props.PlatformAdd(responseJson.items);
          dispatch(uiActions.showAddToaster("Added Successfully !"));
        }
      })



    // setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.platform) {
      errors.platform = "Platform is required";
    }
    return errors;
  };
  return (

    <>
      <Card>
        <CardHeader title="Add PlatForm" />
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
                  Platform
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Platform"
                    className={`form-control form-control-lg form-control-solid `}
                    name="platform"
                    value={formValues.Platform}
                    onChange={handleChange}

                  />
                  {formErrors.platform && (
                    <span className="text-danger">{formErrors.platform}</span>
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
                  to="/manage-platform"
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
export default connect(mapStateToProps, { PlatformAdd })(AddPlatform);
