import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { viewUser, fetchRoles, assignRole } from "./redux/functions";
import { USERView } from "./redux/action";
import { connect, RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { uiActions } from "../../modules/Employee/redux/uiSlice"

function ViewUser(props) {
  const [userViewData, setViewUsersData] = useState([]);
  const [userViewDataManager, setViewUsersDataManager] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rolesToShow, SetRolesToShow] = useState([])
  const [rolesValueToSave, setRoleValueToSave] = useState({})
  const dispatch = useDispatch();

  let { id } = useParams()

  const user = JSON.parse(localStorage.getItem('user'));

  const usersviews = useSelector(state => state.Usersreducer.data);
  // useEffect(() => {
  //   if (usersviews != undefined) {
  //     setViewUsersData(usersviews[0])
  //     setViewUsersDataManager(usersviews[0].reporting_manager[0])
  //   }

  // }, [usersviews]);
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };


  useEffect(() => {
    viewUsersLoad();
    rolesForDropDown()
  }, []);

  const viewUsersLoad = () => {
    enableLoading();
    viewUser(id, user)
      .then((response) => response.json()).then((responseJson) => {
        disableLoading();
        setViewUsersData(responseJson.items[0]);
        setViewUsersDataManager(responseJson.items[0].reporting_manager[0])
        setRoleValueToSave({ role: responseJson.items[0].rolesId })
        props.USERView(responseJson.items);

      })

  };

  const rolesForDropDown = () => {
    fetchRoles(user)
      .then((response) => response.json())
      .then((responseJson) => {
        SetRolesToShow(responseJson.items)
      })
      .catch(err => {
        alert("error in rolesForDropDown", err);
      })
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRoleValueToSave({ [name]: value });
  }
  const updateRole = () => {
    const data = {
      role: rolesValueToSave.role
    }
    if (data.role !== undefined) {
      assignRole(user, id, { data })
        .then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.status_code === 200) {
            dispatch(uiActions.showAddToaster(`Role Updated ${responseJson.message}!`));
            props.history.push('/manage-user')
          }
          if (responseJson.status_code !== 200) {
            dispatch(uiActions.showAddToaster(`Role Updated ${responseJson.message}!`));
            props.history.push('/manage-user')
          }
        })
        .catch(err => {
          alert("error in Update Roles", err)
        })
    }
    else {
      document.getElementById("roleError").innerHTML = "Role required"
      document.getElementById("roleError").color = "red"
    }

  }

  var roles = userViewData.roles;
  var finalrole = roles && roles.join("").toString()
  function capitalizeFirstLetter(string) {
    // return string ? string.charAt(0).toUpperCase() + string.slice(1) || "";
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "UU";
  }

  return (
    <>
      <Card>
        <div className="card-header py-3">
          <div className="card-title align-items-start flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              View User
            </h3>

          </div>

        </div>
        <div className="form">

          {/* begin::Body */}
          <div className="card-body">
            <div className="row">
              <label className="col-xl-3"></label>

            </div>
            {loading && <div className="spinner spinner-primary spinner-lg spinner-center"></div>}
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Name
              </label>
              <div className="col-lg-9 col-xl-6">
                <span className={`form-control form-control-lg form-control-solid `}>{userViewData.firstname} {userViewData.lastname}</span>

              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Email
              </label>
              <div className="col-lg-9 col-xl-6">
                <span className={`form-control form-control-lg form-control-solid `}>{userViewData.email}</span>

              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Role
              </label>
              <div className="col-lg-9 col-xl-6">
                <select
                  className="form-control form-control-lg form-control-solid"
                  name="role" onChange={handleChange}
                  value={rolesValueToSave.role || ""}
                >
                  <option>Select Role</option>
                  {rolesToShow.map((val, index) =>
                    <option key={index} value={val._id}>{val.rolename}</option>
                  )}
                </select>


                <span className="text-danger" id="roleError"></span>


              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Reporting Manager
              </label>
              <div className="col-lg-9 col-xl-6">
                <span className={`form-control form-control-lg form-control-solid `}>{userViewDataManager.firstname} {userViewDataManager.lastname}</span>

              </div>
            </div>
            <div className="card-toolbar">
              <button
                onClick={updateRole}
                type="submit"
                className="btn btn-success mr-2"
              >Save Changes
              </button>

              <Link
                to="/manage-user"
                className="btn btn-secondary"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </>
  )

};

const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { USERView })(ViewUser);
