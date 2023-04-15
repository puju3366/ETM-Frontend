import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { showFocusarea, deleteFocusarea } from "../focusarea/redux/functions";
import { Show } from "../focusarea/redux/action";
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
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Link to="/add-focusarea">
      <Button style={{ background: 'blue', height: 40, width: 100 }}>
        <p>Add New</p>
      </Button>
    </Link>
    <input type="text" className="form-control" placeholder="Search FocusArea" id="search" value={filterText} onChange={onFilter} style={{ height: 40, width: 250 }}  ></input>

    <Button variant="danger" onClick={onClear}>Reset</Button>


  </>
);

function FocusareaMaster(props) {


  const [id, setId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [platformName, setPlatformVal] = useState([]);
  const toastShow = useSelector((state) => state.ui.showAddToast);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useSelector(
    (state) => state.auth
  );
  const { foucusarea: foucusarea } = useSelector(
    (state) => state.PLATFORMreducer
  );
  const dispatch = useDispatch();

  const focusareaList = useSelector(state => state.PLATFORMreducer.data);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (focusareaList != undefined) {
      setPlatformVal(focusareaList)
    }

  }, [focusareaList]);
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  // console.log(focusareaList, platformName, "action");
  const [focusData, setFocusData] = useState([]);
  //let navigate = useNavigate();
  const [filterText, setFilterText] = useState("");


  const filteredItems = focusData.filter(
    (item) =>
    (item.focus_area &&
      item.focus_area.toLowerCase().includes(filterText.toLowerCase()))
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

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const deleteById = (id) => {
    deleteFocusarea({ id }, user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson);
        setOpen(false);
        loadFocusarea();
        dispatch(uiActions.showAddToaster("Deleted Successfully !"));
      })

  }





  const columns = [
    {
      name: "Focus Area",
      selector: row => `${row.focus_area}`,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <>




          <Link to={`/edit-focusarea/` + row._id} className="btn btn-outline-success btn-sm" title='Edit Focusarea'><FontAwesomeIcon icon={faEdit} size="sm" /></Link>
          &nbsp;
          <span
            aria-label="delete"
            color="secondary"
            title="Delete Focusarea"
            className="btn btn-outline-success btn-sm"
            onClick={() => handleClickOpen(row._id)}
          >
            {" "}
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </span>



        </>
      ),

    },
  ];
  useEffect(() => {
    loadFocusarea();
  }, []);

  const loadFocusarea = () => {
    enableLoading();
    showFocusarea(user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson.items, 'res JNSO');
        disableLoading();
        setFocusData(responseJson.items);
        props.Show(responseJson.items);

      })


  };
  const handleToasterClose = () => {
    dispatch(uiActions.hideAddToaster());
  };


  return (

    <>
      <Card>
        <CardHeader title="FocusArea List" />
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
              title="Focus Area Delete"
              msg={"Are you sure to permanently delete this Focus Area?"}
            />
            <div className="main-sec">
              <div className="container-fluid">
                <div className="mainsec-content">
                  <div className="table-responsive">

                    <DataTable
                      // title="FocusArea list"
                      columns={columns}
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

const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, { Show })(FocusareaMaster);
