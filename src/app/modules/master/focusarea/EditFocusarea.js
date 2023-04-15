import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { editFocusarea, showFocusareaById } from "../focusarea/redux/functions";
import { focusareaEdit, ShowFocusareaById } from "../focusarea/redux/action";

import { connect, RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { Link, Redirect, useParams } from "react-router-dom";
import { uiActions } from "../../../modules/Employee/redux/uiSlice";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";

function EditFocusarea(props) {
  const intialValues = { focus_area: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formUserDropDown, setFormUserDropDown] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mentorName, setMentorName] = React.useState([]);
  const [formValbyid, setFormvalbyid] = useState({});
  const dispatch = useDispatch();
  // const { user: currentUser } = useSelector(
  //   (state: RootStateOrAny) => state.auth
  // );
  const user = JSON.parse(localStorage.getItem('user'));
  let { id } = useParams()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormvalbyid({ ...formValbyid, [name]: value });
    //console.log(value);
  };
  //const notify = () => toast("Wow so easy!");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formFocusareaParams = {
      focusarea: formValbyid.focus_area

    };

    setFormErrors(validate(formFocusareaParams));
    if (Object.keys(validate(formFocusareaParams)).length == 0) {
      editFocusarea({ formFocusareaParams }, id, user)
        .then((response) => response.json()).then((responseJson) => {
          //console.log(responseJson);
          if (responseJson.status_code === 200) {
            props.history.push('/focusarea')
            //console.log(responseJson, "users");
            props.focusareaEdit(responseJson.items);
            //toast.success("OLP Added Succesfully");
          }
        })
    }



    setIsSubmitting(true);
    dispatch(uiActions.showAddToaster("Updated Successfully !"));
  };
  useEffect(() => {
    loadPlatformById();

  }, []);
  const loadPlatformById = () => {

    showFocusareaById(id, user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson.items[0].mentor, "testarry");
        props.ShowFocusareaById(responseJson.items[0]);

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });

  };

  const focusaraeusers = useSelector(state => state.Focusareareducer.data);
  useEffect(() => {
    if (focusaraeusers != undefined) {
      setFormvalbyid(focusaraeusers)
    }

  }, [focusaraeusers]);

  const validate = (values) => {
    let errors = {};

    console.log(values, "validate");
    if (!values.focusarea) {
      errors.focus_area = "Focusarea is required";
    }
    return errors;
  };
  //console.log(formValbyid, "val");
  return (

    <>
      <Card>
        <CardHeader title="Edit FocusArea" />
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
                    name="focus_area"
                    value={formValbyid.focus_area || ""}
                    onChange={handleChange}

                  />

                  {formErrors.focus_area && (
                    <span className="text-danger">{formErrors.focus_area}</span>
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
export default connect(mapStateToProps, { focusareaEdit, ShowFocusareaById })(EditFocusarea);
