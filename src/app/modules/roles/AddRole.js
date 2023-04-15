import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addRole, showRights, showModules } from "./redux/functions";
import { RoleAdd, userValmentor, getRightsList, getModuleList } from "./redux/action";
import { connect, useDispatch } from 'react-redux';
import Select from "react-select";
import {
  Card,
  CardHeader,
} from "../../../_metronic/_partials/controls";
import { uiActions } from "../Employee/redux/uiSlice";
import ModuleList from "./ModuleList";
import { createCommonRights, checkNewCheckBox, checkInternalModule } from './userCommon';



function AddRole(props) {
  const intialValues = { rolename: "", isactive: "", rights: [] };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [rights, setRights] = useState({});
  const [module, setModule] = useState({});
  const [rolenameerrors, setRoleNameErros] = useState("");
  const dispatch = useDispatch();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    loadRights();
    loadModules();
  }, []);

  const loadRights = () => {
    showRights(user)
      .then((response) => response.json()).then((responseJson) => {
        setRights(responseJson.items);
      })
  };

  const loadModules = () => {
    showModules(user)
      .then((response) => response.json()).then((responseJson) => {
        setModule(responseJson.items);
      })
  };

  const rightsList = Object.values(rights).map((userVal) => {
    return {
      value: userVal._id,
      name: userVal.name,
      slug: userVal.slug,
      module_id: userVal.moduleID
    }
  }
  );

  const modulesList = Object.values(module).map((userVal) => {
    return {
      value: userVal._id,
      name: userVal.name,
      slug: userVal.slug
    }
  }
  );

  const [selectedRole, setSelectedRole] = useState([]);
  const [permission, setPermission] = useState(false);
  const [allLength, setSetAllLength] = useState();
  const [selectedValue, setSelectedValue] = useState({});
  const [optselectedValue, setOptSelectedValue] = useState([]);

  const setRolesPermission = useCallback((listArray, roleId) => {
    const roleIdArray = roleId && typeof roleId == 'string' ? roleId.split(',') : roleId;
    if (listArray && listArray.length) {
      const selectedOptions = listArray.filter(item => Array.isArray(roleIdArray)
        && roleIdArray.indexOf(item.value.toString()) != -1);
      setOptSelectedValue(selectedOptions);
      let myoptions = []
      myoptions = selectedOptions.map((id) => (
        id.value
      ))
      setSelectedRole(myoptions)
    }
  }, [setRolesPermission, optselectedValue])

  useMemo(() => {
    if (user && user.id && user.user_permission !== null) {
      if (user.user_permission) {
        const userPermision = JSON.parse(user.user_permission);
        Object.entries(permission).forEach(([key, value]) => {
          if (!userPermision[0].hasOwnProperty(key)) {
            userPermision[0][key] = [];
          }
          userPermision[0][key] = checkInternalModule(userPermision[0][key], value)
        });
        setPermission(userPermision[0])
      }
      if (optselectedValue == null) {
        setPermission([]);
      }
    }
    else {
      if (optselectedValue && optselectedValue.length > 0) {
        setPermission({ ...createCommonRights(optselectedValue, rightsList) });
      } else {
        //reset permission
        setPermission([]);
      }
    }
  }, [optselectedValue, setPermission])
  const onChanges = (e, permission, key, module_slug) => {
    const { checked } = e.target;
    setPermission({ ...checkNewCheckBox(checked, permission, module_slug, key) });
  }
  const handleSelectAll = (e, module, name) => {
    const getRightsObject = rightsList.filter(item => item.module_id == module);
    const getRightsArray = getRightsObject.map(item => item.slug);
    if (e.target.checked) {
      if (!permission.hasOwnProperty(name)) {
        permission[name] = [];
      }
      permission[name] = [...permission[name], ...getRightsArray];
      permission[name] = Array.from(new Set(permission[name]));
    } else {
      getRightsArray.forEach(item => {
        if (permission[name].indexOf(item) > -1) {
          permission[name].splice(permission[name].indexOf(item), 1);
        }
      })
      delete permission[name]
    }
    setPermission({ ...permission });
  };
  // console.log('157', permission)
  const user = JSON.parse(localStorage.getItem('user'));
  const handleSubmit = (e) => {
    e.preventDefault();
    const formRoleParams = {
      rolename: formValues.rolename,
      isactive: formValues.isactive,
      rights: permission
    };

    setFormErrors(validate(formRoleParams));
    if (Object.keys(validate(formRoleParams)).length == 0) {
      addRole({ formRoleParams }, user)
        .then((response) => response.json()).then((responseJson) => {
          if (responseJson.status_code === 200) {
            if (responseJson.status === 0) {
              setRoleNameErros(responseJson.message.rolename);
            } else {
              props.history.push('/roles')
              props.RoleAdd(formRoleParams);
              dispatch(uiActions.showAddToaster("Added Successfully !"));
            }

            //toast.success("ROLE Added Succesfully");
          }
        })
      // .catch((err) => {
      //   toast.error("Some Thing Went Wrong");
      // });
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.rolename) {
      errors.rolename = "Role Name is required";
    }
    if (!values.isactive) {
      errors.isactive = "Status is required";
    }
    if (values.rights.length == 0) {
      errors.rights = "Atleat one rights id required";
    }
    if (Object.keys(values.rights).length == 0) {
      errors.rights = "Atleat one rights id required";
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

  return (

    <>
      <Card>
        <CardHeader title="ADD Role" />
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
                  Role Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Role name"
                    className={`form-control form-control-lg form-control-solid `}
                    name="rolename"
                    value={formValues.rolename}
                    onChange={handleChanges}
                  />
                  {formErrors.rolename && (
                    <span className="text-danger">{formErrors.rolename}</span>
                  )}
                  <p style={{ color: 'red' }}>{rolenameerrors ? rolenameerrors : ''}</p>

                </div>
              </div>
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Status
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="isactive" onChange={handleChanges}>
                    <option value="">Select Status...</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  {formErrors.isactive && (
                    <span className="text-danger">{formErrors.isactive}</span>
                  )}

                </div>
              </div>
              <div className="form-group row">
                <ModuleList key="moduleList" modules={modulesList} rights={rightsList} onChange={onChanges}
                  allrights={permission} onSelectAll={handleSelectAll} length={allLength} />
                {formErrors.rights && (
                  <span className="text-danger">{formErrors.rights}</span>
                )}
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
                  to="/roles"
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

//export default AddRole;
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { RoleAdd, userValmentor })(AddRole);
