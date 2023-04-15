import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory  } from "react-router-dom";
import { getEmployeeById, deleteTraning, viewEmpProgress } from "./redux/functions";
import { LinkEmployee, ViewEmployee, getEmpList } from "./redux/action";
import { connect, RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/fontawesome-free-solid";
import DailogBox from "../components/DailogBox";
import ModalBox from "../components/ModalBox";
import Select from "react-select";
import { uiActions } from "../../modules/Employee/redux/uiSlice";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { hashHistory } from 'react-router';

function EmployeeList(props) {
    const [empid, setempId] = useState(null);
    const [empidView, setempIdView] = useState(null);
    const intialValues = { traningname: "", platform: "", courselink: "", focusarea: "", level: "", noofvideos: "", start_date: "", end_date: "", mentor: "", empname: "" };
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
    const [viewTotalVideos, setTotalVideos] = useState({});
   const [viewProgressTimeline, setViewProgressTimelineData] = useState([]);
   let history = useHistory()
    // const [viewEmpProgData, setEmpProgressData] = useState(null);
    // const [viewEmpProgData, setEmpProgressData] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    let { id } = useParams()
    const { user: currentUser } = useSelector(
        (state: RootStateOrAny) => state.auth
    );


    const user = JSON.parse(localStorage.getItem('user'));
    //   const ITEM_HEIGHT = 48;
    //   const ITEM_PADDING_TOP = 8;
    //   const MenuProps = {
    //     PaperProps: {
    //       style: {
    //         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //         width: 250,
    //       },
    //     },
    //   };
    useEffect(() => {

        loadViewEmp();

    }, []);
    const loadViewEmp = () => {

        getEmployeeById(id, user)
            .then((response) => response.json()).then((responseJson) => {
                //  console.log(responseJson, "company");
                if (responseJson.items[0]) {
                    //  console.log(5);
                    const empval = responseJson.items[0].Company.map(val => (
                        {
                            id: val._id,
                            name: val.firstname + " " + val.lastname
                        }
                    ));
                    setSelectedValue(Array.isArray(responseJson.items[0].Company) ? responseJson.items[0].Company.map(x => x._id) : []);
                    setEmpData(empval);
                }

            })


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


    const userList = Object.values(formUserDropDown).map((userVal) => {
        return {
            id: userVal._id,
            label: userVal.firstname + " " + userVal.lastname

        }
    }
    );
    const options = userList.map((id) => ({ value: id.id, label: id.label }));

    const columns = [
        {
            name: "Employee Name",
            selector: row => `${row.name}`,
            sortable: true,
        },
        {
            name: "Actions",
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
    }

    const handleClickViewEmpProg = (empid) => {
        // console.log(id);
        // // console.log(empid);
      
        viewEmpProgress(id, empid, user)
        .then((response)=>response.json()).then((responseJson)=>{
            //console.log(responseJson);
            if(responseJson.items){
            setTotalVideos(responseJson.items);
            setViewProgressTimelineData(responseJson.items.ProgressTimeline)
            }
        })
        // .then((response)=>response.json()).then((responsejson)=>{
        //     // .then((response)=>response.json()).then((responseJson) => {
        //     console.log(responsejson, "responsejson");
        // }))
        
        setempIdView(empid);
        setOpenEmpView(true);

    }

    function handleClose() {
        setOpen(false);
    }

    function handleCloseEmpView() {
        setOpenEmpView(false);
    }
    // console.log(empid);
    function deleteById() {
       // console.log(empid);
        deleteTraning({ empid }, id, user)
            .then((response) => response.json()).then((responseJson) => {
                // console.log(responseJson.items);
                if (responseJson.status_code === 200) {
                    console.log(responseJson);
                setOpen(false);
                // props.history.push('/olp');
                history.goBack()
                //props.OLPDelete(responseJson.items);
                //  table.ajax.reload(null, false)
                dispatch(uiActions.showAddToaster("Deleted Employee"));
               }
            })

    }


    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "100",
    };



    return (

        <>
            <Card>
                <CardHeader title="Employee List" />
                <div className="dashboard">
                    <div className="smartphone-menu-trigger" />

                    <main>
                        <div className="main-sec">
                            <div className="container-fluid">
                                <div className="mainsec-content">
                                    <div className="table-responsive">
                                        <DailogBox
                                            id={id}
                                            open={open}
                                            close={handleClose}
                                            delete={() => deleteById(id)}
                                            title="Employee Delete"
                                            msg={"Are you sure to permanently delete this Employee?"}
                                        />
                                        <ModalBox
                                            id={id}
                                            open={openEmpView}
                                            close={handleCloseEmpView}
                                            empData={viewTotalVideos}
                                            title="Employee View"
                                            progress={viewProgressTimeline}
                                            msg={""}
                                        />
                                        <DataTable
                                            //title="Users"
                                            columns={columns}
                                            className="dashboard-table"
                                            pagination
                                            data={empData}
                                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                                            //actions={actions}
                                            persistTableHead
                                            paginationComponentOptions={paginationComponentOptions}
                                        />
                                        {loading && <div className="spinner spinner-primary spinner-lg spinner-center"></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </Card>
            {/* <Card>
        <div className="card-header py-3">
          <div className="card-title align-items-start flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              Employee List
            </h3>
            <DailogBox
              id={id}
              open={open}
              close={handleClose}
              delete={() => deleteById(id)}
              title="Employee Delete"
              msg={"Are you sure to permanently delete this Employee?"}
            />
            <ModalBox
              id={id}
              open={openEmpView}
              close={handleCloseEmpView}
              empData={empidView}
              title="Employee View"
              msg={""}
            />
            <DataTable

              columns={columns}
              className="dashboard-table"
              pagination
              data={empData}
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1

              persistTableHead
              paginationComponentOptions={paginationComponentOptions}
            />
          </div>

        </div>
      </Card> */}
        </>
    );
};


const mapStateToProps = formValues => ({
    intialValues: formValues
});
export default connect(mapStateToProps, { LinkEmployee, ViewEmployee, getEmpList })(EmployeeList);
