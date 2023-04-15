import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { showPlatform, deletePlatform } from "../platform/redux/functions";
import { Show } from "../platform/redux/action";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/fontawesome-free-solid";
import DailogBox from "../../../modules/components/DailogBox";
import Toaster from "../../../modules/components/Toaster";
import { uiActions } from "../../../modules/Employee/redux/uiSlice";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { ToastContainer, toast } from "react-toastify";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Link to="/add-platform">
      <Button style={{ background: 'blue', height: 40, width: 100 }}>
        <p>Add New</p>
      </Button>
    </Link>
    {/* <button component={Link} to="/add-olp" class="primary"> Add New </button> */}
    <input type="text" className="form-control" placeholder="Search Platform" id="search" value={filterText} onChange={onFilter} style={{ height: 40, width: 250 }}  ></input>

    <Button variant="danger" onClick={onClear}>Reset</Button>


  </>
);

function PlatformMaster(props) {
  const toastShow = useSelector((state) => state.ui.showAddToast);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [platformName, setPlatformVal] = useState([]);
  // const { user: currentUser } = useSelector(
  //   (state) => state.auth
  // );


  const platforList = useSelector(state => state.PLATFORMreducer.data);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (platforList != undefined) {
      setPlatformVal(platforList)
    }

  }, [platforList]);
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const handleToasterClose = () => {
    dispatch(uiActions.hideAddToaster());
  };
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(Show(platforList));

  }, []);


  const [olpPlatform, setPlatformData] = useState([]);
  //let navigate = useNavigate();
  const [filterText, setFilterText] = useState("");


  const filteredItems = olpPlatform.filter(
    (item) =>
    (item.platform &&
      item.platform.toLowerCase().includes(filterText.toLowerCase()))
  );
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "100",
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





  function deleteById(id) {
    deletePlatform({ id }, user)
      .then((response) => response.json()).then((responseJson) => {
        setOpen(false);
        loadPlatform();
        dispatch(uiActions.showAddToaster("Deleted Successfully !"));
        //props.OLPDelete(responseJson.items);
      })
  }

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }


  const columns = [
    {
      name: "Plat Form",
      selector: row => `${row.platform}`,
      sortable: true,
    },

    {
      name: "Actions",

      cell: (row) => (
        <>


          <Link to={`/edit-platform/` + row._id} className="btn btn-outline-success btn-sm" title='Edit Platform'><FontAwesomeIcon icon={faEdit} size="sm" /></Link>
          &nbsp;
          <span
            aria-label="delete"
            color="secondary"
            title="Delete Platform"
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
    loadPlatform();
  }, []);

  const loadPlatform = () => {
    enableLoading();
    showPlatform(user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson.items[0].trainingname, 'res JNSO');
        disableLoading();
        setPlatformVal(responseJson.items)
        setPlatformData(responseJson.items)
        props.Show(responseJson.items);

      })
    // .catch((err) => {
    //   toast.error("Some Thning Went Wrong");
    // });

  };





  return (

    <>
      <Card>
        <ToastContainer />
        <CardHeader title="PlatForm List" />
        {toastShow && (
          <Toaster
            show={toastShow}
            close={handleToasterClose}
            bgcolor="#1bc5bd"
            txtcolor="white"
          // bodyMsg="Added successfuly.!"
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
              title="Platform Delete"
              msg={"Are you sure to permanently delete this Platform?"}
            />

            <div className="main-sec">
              <div className="container-fluid">
                <div className="mainsec-content">
                  <div className="table-responsive">

                    <DataTable
                      // title="PlatForm list"
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

//export default AddOlp;
const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { Show })(PlatformMaster);
