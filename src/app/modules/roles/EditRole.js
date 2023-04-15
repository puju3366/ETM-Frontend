import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editRole, showRoleById, showModules, showRights } from "./redux/functions";
import { RoleEdit, ShowROLEById } from "./redux/action";
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import {
  Card,
  CardHeader,
} from "../../../_metronic/_partials/controls";
import Toaster from "../../modules/components/Toaster";
import { uiActions } from "../../modules/Employee/redux/uiSlice";
import moment from 'moment';
import ModuleList from "./ModuleList";
import { createCommonRights, checkNewCheckBox, checkInternalModule } from './userCommon';
import { isObject } from "lodash";




function EditRole(props) {

  const intialValues = { rolename: "", isactive: "", rights: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formValbyid, setFormvalbyid] = useState({});
  const [rolenameerrors, setRoleNameErros] = useState("");
  const [loading, setLoading] = useState(false);
  const [rights, setRights] = useState({});
  const [module, setModule] = useState({});
  const dispatch = useDispatch();
  let { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormvalbyid({ ...formValbyid, [name]: value });
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

  const roleeditusers = useSelector(state => state.Rolereducer.data);
  useEffect(() => {
    if (roleeditusers != undefined) {
      setFormvalbyid(roleeditusers)
    }
  }, [roleeditusers]);
  useMemo(() => {
    if (roleeditusers && roleeditusers._id && roleeditusers.rights !== null) {
      if (roleeditusers.rights) {
        const userPermision = roleeditusers.rights;
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
  }, [optselectedValue, setPermission, roleeditusers])
  const onChanges = (e, permission, key, module_slug) => {
    const { checked } = e.target;
    setPermission({ ...checkNewCheckBox(checked, permission, module_slug, key) });
  }
  const handleSelectAll = (e, module, name) => {
    const getRightsObject = rightsList.filter(item => item.module_id == module);
    const getRightsArray = getRightsObject.map(item => item.slug);

    if (e.target.checked) {
      if (typeof permission !== "undefined" && !permission.hasOwnProperty(name)) {
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

  const enableLoading = () => {
    setLoading(true);
  };
  const disableLoading = () => {
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (permission && Object.keys(permission).length == 0) {
      setPermission({});
    }
    const formRoleParams = {
      rolename: formValbyid.rolename,
      isactive: formValbyid.isactive,
      rights: permission
    };
    setFormErrors(validate(formRoleParams));
    if (Object.keys(validate(formRoleParams)).length == 0) {
      editRole({ formRoleParams }, id, user)
        .then((response) => response.json()).then((responseJson) => {
          if (responseJson.status === 0) {
            setRoleNameErros(responseJson.message.rolename);
          } else {
            props.history.push('/roles')
            props.RoleEdit(formRoleParams);
            dispatch(uiActions.showAddToaster("Updated Successfully !"));
          }
        })
        .catch((err) => {
          toast.error("Please enter valid field");
        });
    }
  };
  useEffect(() => {
    loadRoleById();
  }, []);

  const loadRoleById = () => {
    enableLoading();
    showRoleById(id, user)
      .then((response) => response.json()).then((responseJson) => {
        setSelectedValue(Array.isArray(responseJson.items[0].isactive) ? responseJson.items[0].isactive.map(x => x._id) : []);
        props.ShowROLEById(responseJson.items[0]);
        disableLoading();

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });

  };

  const validate = (values) => {
    let errors = {};
    if (!values.rolename) {
      errors.rolename = "Role Name is required";
    }
    if (!values.isactive) {
      errors.isactive = "Isactive is required";
    }
    if (values.rights && values.rights.length == 0) {
      errors.rights = "Atleats one rights id required";
    }
    if (Object.values(values.rights).length == 0) {
      errors.rights = "Atleats one rights id required";
    }
    const a = Object.keys(values.rights).length;
    return errors;
  };
  return (

    <>
      <Card>
        <CardHeader title="Edit Role" />
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
                  Role Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Role name"
                    className={`form-control form-control-lg form-control-solid `}
                    name="rolename"
                    value={formValbyid.rolename || ''}
                    onChange={handleChange}

                  />
                  {formErrors.rolename && (
                    <span className="text-danger">{formErrors.rolename}</span>
                  )}
                  <p style={{ color: 'red' }}>{rolenameerrors ? rolenameerrors : ''}</p>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  isActive
                </label>
                <div className="col-lg-9 col-xl-6">
                  <select
                    className="form-control form-control-lg form-control-solid"
                    name="isactive" value={formValbyid.isactive} onChange={handleChange}
                  >
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
                  <ToastContainer />
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

//export default AddOlp;
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { RoleEdit, ShowROLEById })(EditRole);
