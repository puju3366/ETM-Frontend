import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { addFocusarea } from "../focusarea/redux/functions";
import { FocusareaAdd } from "../focusarea/redux/action";
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

function AddFocusarea(props) {
  const intialValues = { focusarea: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [formUserDropDown, setFormUserDropDown] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [mentorName, setMentorName] = React.useState([]);
  // const { user: currentUser } = useSelector(
  //   (state: RootStateOrAny) => state.auth
  // );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(value);
  };
  //const notify = () => toast("Wow so easy!");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formFocusareaParams = {
      focusarea: formValues.focusarea

    };
    //console.log(formOLPParams);
    setFormErrors(validate(formValues));
    addFocusarea({ formFocusareaParams }, user)
      .then((response) => response.json()).then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status_code === 200) {
          props.history.push('/focusarea')
          console.log(responseJson, "users");
          props.FocusareaAdd(responseJson.items);
          //toast.success("OLP Added Succesfully");
          dispatch(uiActions.showAddToaster("Added Successfully !"));
        }
      })



    // setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};

    console.log(values, "validate");
    if (!values.focusarea) {
      errors.focusarea = "Focusarea is required";
    }
    return errors;
  };
  return (

    <>
      <Card>
        <CardHeader title="Add FocusArea" />
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
                  FocusArea
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="FocusArea"
                    className={`form-control form-control-lg form-control-solid `}
                    name="focusarea"
                    value={formValues.focusarea}
                    onChange={handleChange}

                  />
                  {formErrors.focusarea && (
                    <span className="text-danger">{formErrors.focusarea}</span>
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
                  to="/manage-focus-area"
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
export default connect(mapStateToProps, { FocusareaAdd })(AddFocusarea);
