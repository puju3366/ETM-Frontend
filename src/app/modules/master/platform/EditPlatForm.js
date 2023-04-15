import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { editPlatform, showPlatformById } from "../platform/redux/functions";
import { PlatformEdit, ShowPlatfromById } from "../platform/redux/action";
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

function EditPlatForm(props) {
  const intialValues = { platform: "" };
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
  let { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormvalbyid({ ...formValbyid, [name]: value });
    //console.log(value);
  };
  //const notify = () => toast("Wow so easy!");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formPlatformParams = {
      platform: formValbyid.platform

    };
    //console.log(formOLPParams);
    setFormErrors(validate(formPlatformParams));
    if (Object.keys(validate(formPlatformParams)).length == 0) {
      editPlatform({ formPlatformParams }, id, user)

        .then((response) => response.json()).then((responseJson) => {
          //console.log(response);
          if (responseJson.status_code === 200) {
            props.history.push('/platform')
            props.PlatformEdit(formPlatformParams);
            // dispatch(uiActions.showAddToaster("Updated Successfully"));
          }
        })
    }



    setIsSubmitting(true);
    dispatch(uiActions.showAddToaster("Updated Successfully"));
  };
  useEffect(() => {
    loadPlatformById();

  }, []);

  const loadPlatformById = () => {

    showPlatformById(id, user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson.items[0].mentor, "testarry");
        props.ShowPlatfromById(responseJson.items[0]);

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });

  };
  const platformeditusers = useSelector(state => state.PLATFORMreducer.data);
  useEffect(() => {
    if (platformeditusers != undefined) {
      setFormvalbyid(platformeditusers)
    }

  }, [platformeditusers]);

  const validate = (values) => {
    let errors = {};

    console.log(values, "validate");
    if (!values.platform) {
      errors.platform = "Platform is required";
    }
    return errors;
  };
  //console.log(formValbyid.platform, "values");
  return (

    <>
      <Card>
        <CardHeader title="Edit PlatForm" />
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
                    value={formValbyid.platform || ""}
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
export default connect(mapStateToProps, { PlatformEdit, ShowPlatfromById })(EditPlatForm);
