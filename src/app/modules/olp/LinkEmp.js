import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  linkEmployee,
  showOlpById,
  mentorNameById,
  showUservalMentor,
  getEmployeeById,
  deleteTraning,
} from "./redux/functions";
import { LinkEmployee, ViewEmployee, getEmpList } from "./redux/action";
import { connect, RootStateOrAny, useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/fontawesome-free-solid";
import DailogBox from "../components/DailogBox";
import ModalBox from "../components/ModalBox";
import Select from "react-select";
import EmployeeList from "./EmployeeList";
import { uiActions } from "../../modules/Employee/redux/uiSlice";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

function LinkEmp(props) {
  const [empid, setempId] = useState(null);
  const [empidView, setempIdView] = useState(null);
  const intialValues = {
    traningname: "",
    platform: "",
    courselink: "",
    focusarea: "",
    level: "",
    noofvideos: "",
    start_date: "",
    end_date: "",
    mentor: "",
    empname: "",
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [formValbyid, setFormvalbyid] = useState({});
  const [mentorName, setMentorName] = useState({});
  const [mentorNamebyVal, setMentorNameByVal] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [formUserDropDown, setFormUserDropDown] = useState({});
  const [empData, setEmpData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEmpView, setOpenEmpView] = React.useState(false);
  const [viewEmpProgData, setEmpProgressData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSpan, setshowSpan] = useState(false);
  const [showError, setError] = useState([]);
  const dispatch = useDispatch();

  let { id } = useParams();
  const { user: currentUser } = useSelector(
    (state: RootStateOrAny) => state.auth
  );

  const user = JSON.parse(localStorage.getItem("user"));
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
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function handleChangeSelect(value) {
    // console.log(value, "value");
    if (value !== null) {
      //  console.log(6);
      const myoptions = value.map((id) => id.value);
      // console.log(myoptions, "options");
      setMentorNameByVal(myoptions);
      setSelectedValue(myoptions);
    } else {
      setMentorNameByVal([]);
      setSelectedValue([]);
      setshowSpan(false);
      //setError();
      console.log(7);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValues, personName);
    // console.log(personName);
    const linkEmpParams = {
      empname: selectedValue,
    };
    setFormErrors(validate(linkEmpParams));
    if (Object.keys(validate(linkEmpParams)).length == 0) {
      linkEmployee({ linkEmpParams }, id, user)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.msg) {
            console.log(linkEmpParams.empname, "res");
            setshowSpan(true);
            setError(responseJson.msg);
            // setMentorNameByVal([]);
            // setSelectedValue([]);
          }

          if (responseJson.status_code == 200) {
            props.history.push("/olp-training");
            props.LinkEmployee(responseJson);
            dispatch(uiActions.showAddToaster("Linked Successfully !"));
          }
        });
      // .catch((error) => {
      //   console.log(error);

      // })
    }

    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
    if (values.empname.length == 0) {
      errors.empname = "Employee is required";
    }

    return errors;
  };
  useEffect(() => {
    loadOlpById();
    loadUserdropdown();
    // loadViewEmp();
  }, []);
  const loadOlpById = () => {
    enableLoading();
    showOlpById(id, user)
      .then((response) => response.json())
      .then((responseJson) => {
        mentorbyId(responseJson.items[0].mentor);
        props.ViewEmployee(responseJson.items[0]);
        disableLoading();
      });
  };

  // const loadViewEmp = () => {

  //   getEmployeeById(id, user)
  //     .then((response) => response.json()).then((responseJson) => {
  //       //  console.log(responseJson, "company");
  //       if (responseJson.items[0]) {
  //         //  console.log(5);
  //         const empval = responseJson.items[0].Company.map(val => (
  //           {
  //             id: val._id,
  //             name: val.firstname + " " + val.lastname
  //           }
  //         ));
  //         setSelectedValue(Array.isArray(responseJson.items[0].Company) ? responseJson.items[0].Company.map(x => x._id) : []);
  //         setEmpData(empval);
  //       }

  //     })

  // };

  const linkEmpView = useSelector((state) => state.Olpreducer.data);
  //console.log(linkEmpView, "redux");
  useEffect(() => {
    if (linkEmpView != undefined) {
      setFormvalbyid(linkEmpView);
    }
  }, [linkEmpView]);

  const duration = () => {
    var startdate = new Date(formValbyid.startdate); //firstDate
    var endate = new Date(formValbyid.endate); //firstDate
    var diff = Math.abs(startdate - endate); //in milliseconds
    return diff / (1000 * 60 * 60 * 24);
  };

  const mentorbyId = (mentor) => {
    mentorNameById(mentor, user)
      .then((response) => response.json())
      .then((responseJson) => {
        //setMentorName(responseJson.items);
        //console.log(responseJson.items, "mentor");
        let arrayVal = responseJson.items
          ? responseJson.items.map((x) => x.firstname + " " + x.lastname)
          : [];
        //console.log(arrayVal.join());
        setMentorName(arrayVal.join());
      });
  };

  const loadUserdropdown = () => {
    showUservalMentor(user)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code === 200) {
          setFormUserDropDown(responseJson.items);

          //props.userValmentor(responseJson.items);
        }
      });
  };

  // const mentorList = Object.values(mentorName).map((val) => {
  //   return {
  //     name: val.firstname+" "+val.lastname
  //   }

  // });
  const userList = Object.values(formUserDropDown).map((userVal) => {
    return {
      id: userVal._id,
      label: userVal.firstname + " " + userVal.lastname,
    };
  });
  const options = userList.map((id) => ({ value: id.id, label: id.label }));

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => `${row.name}`,
      sortable: true,
    },
    {
      cell: (row) => (
        <>
          <span
            aria-label="delete"
            color="secondary"
            className="btn btn-outline-success btn-sm"
            onClick={() => handleClickOpen(row.id)}
          >
            {" "}
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </span>
          &nbsp;
          <span
            aria-label="view"
            color="secondary"
            className="btn btn-outline-success btn-sm"
            onClick={() => handleClickViewEmpProg(row.id)}
          >
            {" "}
            <FontAwesomeIcon icon={faEye} size="sm" />
          </span>
        </>
      ),
    },
  ];

  const handleClickOpen = (empid) => {
    // console.log(empid);
    setempId(empid);
    setOpen(true);
  };

  const handleClickViewEmpProg = (empid) => {
    // console.log(id);
    // // console.log(empid);
    setEmpProgressData(empid);
    setempIdView(empid);
    setOpenEmpView(true);
  };

  function handleClose() {
    setOpen(false);
  }

  function handleCloseEmpView() {
    setOpenEmpView(false);
  }
  // console.log(empid);
  function deleteById() {
    console.log(empid);
    deleteTraning({ empid }, id, user)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setOpen(false);
        props.history.push("/olp-training");
        //props.OLPDelete(responseJson.items);
        //  table.ajax.reload(null, false)
        dispatch(uiActions.showAddToaster("Deleted Employee"));
      });
  }

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "100",
  };

  return (
    <>
      <Card>
        <CardHeader title="Link Training To Employee" />
        {loading && (
          <div className="spinner spinner-primary spinner-lg spinner-center"></div>
        )}
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
                    readOnly
                    className={`form-control form-control-lg form-control-solid `}
                    name="traningname"
                    value={formValbyid.trainingname || ""}
                    onChange={handleChange}
                  />
                  {formErrors.traningname && (
                    <span className="text-danger">
                      {formErrors.traningname}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Focus Area
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder=""
                    readOnly
                    className={`form-control form-control-lg form-control-solid `}
                    name="traningname"
                    value={formValbyid.focus_area || ""}
                    onChange={handleChange}
                  />
                  {formErrors.focusarea && (
                    <span className="text-danger">{formErrors.focusarea}</span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Level
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder=""
                    readOnly
                    className={`form-control form-control-lg form-control-solid `}
                    name="traningname"
                    value={formValbyid.level || ""}
                    onChange={handleChange}
                  />
                  {formErrors.level && (
                    <span className="text-danger">{formErrors.level}</span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Duration
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Mentor"
                    className={`form-control form-control-lg form-control-solid `}
                    name="duration"
                    value={duration() + "Days" || ""}
                    onChange={handleChange}
                    readOnly
                  />
                  {formErrors.duration && (
                    <span className="text-danger">{formErrors.duration}</span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Mentor
                </label>
                <div className="col-lg-9 col-xl-6">
                  {/* <span className={`form-control form-control-lg form-control-solid ` }>
                {mentorName}
                </span> */}
                  <input
                    type="text"
                    placeholder="Mentor"
                    className={`form-control form-control-lg form-control-solid `}
                    name="mentor"
                    value={mentorName || ""}
                    onChange={handleChange}
                  />
                  {formErrors.mentor && (
                    <span className="text-danger">{formErrors.mentor}</span>
                  )}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Employee
                </label>
                <div className="col-lg-9 col-xl-6">
                  <Select
                    closeMenuOnSelect={true}
                    isMulti
                    isClearable
                    name="empname"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    //value={options.find(obj => obj.value === "624af557de761807e453c187")}
                    // value={options.filter(obj => selectedValue.includes(obj.value))} // set selected values

                    //onChange={(val)=> {onChangeFunc({target: { name:'mentor', value: val.value }})}}
                    onChange={handleChangeSelect}
                  />

                  <span
                    className="text-danger"
                    style={{ display: showSpan ? "block" : "none" }}
                  >
                    {showError}
                  </span>
                  {formErrors.empname && (
                    <span className="text-danger">{formErrors.empname}</span>
                  )}
                </div>
              </div>

              <div className="card-toolbar">
                <button type="submit" className="btn btn-success mr-2">
                  Save Changes
                </button>
                <Link to="/olp-training" className="btn btn-secondary">
                  Cancel
                </Link>
              </div>
            </div>
            {/* end::Body */}
          </div>
          {/* end::Form */}
        </form>
      </Card>
      <EmployeeList />
    </>
  );
}

const mapStateToProps = (formValues) => ({
  intialValues: formValues,
});
export default connect(mapStateToProps, {
  LinkEmployee,
  ViewEmployee,
  getEmpList,
})(LinkEmp);
