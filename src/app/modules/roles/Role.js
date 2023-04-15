import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { deleteRole, showRole, notifyEmployeeApi } from "./redux/functions";
import { connect, useSelector, useDispatch } from "react-redux";
import { RoleDelete, RoleShow } from "./redux/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faEnvelope } from "@fortawesome/fontawesome-free-solid";
import DailogBox from "../components/DailogBox";
import Toaster from "../components/Toaster";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";

import { uiActions } from "../Employee/redux/uiSlice";
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Link to="/add-role">
      <Button style={{ background: 'blue', height: 40, width: 100 }}>
        <p>Add New</p>
      </Button>
    </Link>
    <input type="text" className="form-control" placeholder="Search Roles" id="search" value={filterText} onChange={onFilter} style={{ height: 40, width: 250 }}  ></input>

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
  const [olpData, setRoleData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredItems = olpData.filter(
    (item) =>
    (item.rolename &&
      item.rolename.toLowerCase().includes(filterText.toLowerCase()))
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
    deleteRole({ id }, user)
      .then((response) => response.json()).then((responseJson) => {
        setOpen(false);
        loadRole();
        //props.OLPDelete(responseJson.items);
        dispatch(uiActions.showAddToaster("Deleted Successfully !"));
      })
  }

  const columns = [
    {
      name: "Role Name",
      selector: row => `${row.rolename}`,
      sortable: true,
    },
    {
      name: "Actions",

      cell: (row) => (
        <>
          &nbsp;
          <Link to={`/edit-role/` + row._id} className="btn btn-outline-success btn-sm" title='Edit Role'><FontAwesomeIcon icon={faEdit} size="sm" /></Link>
          &nbsp;
          &nbsp;
          <span
            aria-label="delete"
            color="secondary"
            title='Delete Role'
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

  useEffect(() => {
    loadRole();
  }, []);

  const loadRole = () => {
    enableLoading();
    showRole(user)
      .then((response) => response.json()).then((responseJson) => {
        disableLoading();
        setRoleData(responseJson.items);
        props.RoleShow(responseJson.items);

      }).catch((err) => {
        toast.error("Some Thning Went Wrong");
      });

  };

  return (

    <>
      <Card>
        <CardHeader title="Role List" />
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
export default connect(mapStateToProps, { RoleDelete, RoleShow })(Olp);
