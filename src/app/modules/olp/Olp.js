import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { deleteOlp, showOlp, notifyEmployeeApi } from "./redux/functions";
import { connect, useSelector, useDispatch } from "react-redux";
import { OLPDelete, OLPShow } from "./redux/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faEnvelope } from "@fortawesome/fontawesome-free-solid";
import DailogBox from "../components/DailogBox";
import Toaster from "../../modules/components/Toaster";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

import { uiActions } from "../../modules/Employee/redux/uiSlice";
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Link to="/add-olp">
      <Button style={{ background: 'blue', height: 40, width: 100 }}>
        <p>Add New</p>
      </Button>
    </Link>
    <input type="text" className="form-control" placeholder="Search Training" id="search" value={filterText} onChange={onFilter} style={{ height: 40, width: 250 }}  ></input>

    <Button variant="danger" onClick={onClear}>Reset</Button>


  </>
);

function Olp(props) {
  const [id, setId] = useState(null);
  const toastShow = useSelector((state) => state.ui.showAddToast);
  const [open, setOpen] = React.useState(false);
  const [olpName, setOLPVal] = useState([]);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(
    (state) => state.auth
  );
  const olpusers = useSelector(state => state.Olpreducer.data);



  useEffect(() => {
    if (olpusers != undefined) {
      setOLPVal(olpusers)
    }

  }, [olpusers]);
  const handleToasterClose = () => {
    dispatch(uiActions.hideAddToaster());
  };


  const user = JSON.parse(localStorage.getItem('user'));
  const accesToken = JSON.parse(localStorage.getItem('user'));
  const [olpData, setOlpData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredItems = olpData.filter(
    (item) =>
      (item.trainingname &&
        item.trainingname.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.platform &&
        item.platform.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.level &&
        item.level.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.focus_area &&
        item.focus_area.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.no_of_video &&
        item.no_of_video.toLowerCase().includes(filterText.toLowerCase()))
  );
  //  console.log(filteredItems, "action");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "100",
  };
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const actions = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function deleteById(id) {
    deleteOlp({ id }, user)
      .then((response) => response.json()).then((responseJson) => {
        setOpen(false);
        loadOlp();
        //props.OLPDelete(responseJson.items);
        dispatch(uiActions.showAddToaster("Deleted Successfully !"));
      })
  }


  const notifyEmployee = (id) => {
    notifyEmployeeApi({ id }, user)
      .then((response) => response.json()).then((responseJson) => {
        if (responseJson.Success) {
          dispatch(uiActions.showAddToaster("Mail request has sent !"));
        } else {
          dispatch(uiActions.showAddToaster("Employee Not linked to this training!!"));
        }
      })
  }
  const columns = [
    {
      name: "Training Name",
      selector: row => `${row.trainingname}`,
      sortable: true,
    },

    {
      name: "PlatFrom",
      selector: row => `${row.platform}`,
    },


    {
      name: "Level",
      selector: row => `${row.level}`,
      sortable: true,
    },

    {
      name: "Focus Area",
      selector: row => `${row.focus_area}`,
      sortable: true,
    },
    {
      name: "No of Videos",
      selector: row => `${row.no_of_video}`,
      sortable: true,
    },
    {
      name: "Duration In Days",
      cell: (row) => (
        <>
          {duration(row)}
        </>
      ),
    },
    // {
    //     name: "Mentor",
    //    // selector: "mentor",
    //     cell: (row) => (
    //       <> 
    //           {mentorbyId(row)}

    //       </>
    //       ),
    // },

    {
      name: "Actions",

      cell: (row) => (
        <>

          <Link to={`/link-emp/` + row._id} className="btn btn-outline-success btn-sm" title='Link Employee'><FontAwesomeIcon icon={faPlus} size="sm" /></Link>
          {/* <Link to={`/link-emp/`+ row._id} className="">
          {" "}
          Link EMP
        </Link> */}
          &nbsp;
          <Link to={`/edit-olp/` + row._id} className="btn btn-outline-success btn-sm" title='Edit Training'><FontAwesomeIcon icon={faEdit} size="sm" /></Link>
          &nbsp;
          {/* <button className="btn btn-outline-success btn-sm"><FontAwesomeIcon icon={faEdit} size="sm" />Notify</button> */}
          <a onClick={() => notifyEmployee(row._id)} className="btn btn-outline-success btn-sm" title='Notify Participants'>
            <FontAwesomeIcon icon={faEnvelope} size="sm" />
            {/* <i className="flaticon2-mail"></i> */}
          </a>
          &nbsp;
          <span
            aria-label="delete"
            color="secondary"
            title='Delete Training'
            className="btn btn-outline-success btn-sm"
            onClick={() => handleClickOpen(row._id)}
          >
            {" "}
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </span>


        </>
      ),
      sortable: true,
    },
  ];

  const duration = (row) => {
    var startdate = new Date(row.startdate) //firstDate
    var endate = new Date(row.endate) //firstDate
    var diff = Math.abs(startdate - endate); //in milliseconds
    return diff / (1000 * 60 * 60 * 24);
  };

  const mentorbyId = (mentor) => {

    let arrmentor = [];
    mentor.mentor.map((val) => arrmentor.push(val))
    //return arrmentor[0].firstname;
    //console.log(arrmentor[0].firstname, "array");
  };






  useEffect(() => {
    loadOlp();
  }, []);

  const loadOlp = () => {
    enableLoading();
    showOlp(user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson.items[0].trainingname, 'res JNSO');
        disableLoading();
        setOlpData(responseJson.items);
        props.OLPShow(responseJson.items);

      })
      .catch((err) => {
        toast.error("Some Thning Went Wrong");
      });

  };





  return (

    <>
      <Card>
        <CardHeader title="Training List" />
        {toastShow && (
          <Toaster
            show={toastShow}
            close={handleToasterClose}
            bgcolor="#1bc5bd"
            txtcolor="white"
          />
        )}
        <div className="dashboard">
          <div className="smartphone-menu-trigger" />

          <main>
            <DailogBox
              id={id}
              open={open}
              close={handleClose}
              delete={() => deleteById(id)}
              title="Training Delete"
              msg={"Are you sure to permanently delete this Training?"}
            />
            <div className="main-sec">
              <div className="container-fluid">
                <div className="mainsec-content">
                  <div className="table-responsive">

                    <DataTable
                      // title="OLP list"
                      columns={columns}
                      order="desc"
                      className="dashboard-table"
                      pagination
                      data={filteredItems}
                      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                      actions={actions}
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
    </>
  );
};

//export default Olp;
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { OLPDelete, OLPShow })(Olp);
