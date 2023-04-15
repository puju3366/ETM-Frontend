import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { deleteRight, showRight } from "./redux/functions";
import { connect, useSelector, useDispatch } from "react-redux";
import { RightDelete, RightShow } from "./redux/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faEnvelope } from "@fortawesome/fontawesome-free-solid";
import DailogBox from "../components/DailogBox";
import Toaster from "../components/Toaster";
import {
  Card,
  CardHeader
} from "../../../_metronic/_partials/controls";

import { uiActions } from "../Employee/redux/uiSlice";
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Link to="/add-rigths">
      <Button style={{ background: 'blue', height: 40, width: 100 }}>
        <p>Add New</p>
      </Button>
    </Link>
    <input type="text" className="form-control" placeholder="Search Right" id="search" value={filterText} onChange={onFilter} style={{ height: 40, width: 250 }}  ></input>

    <Button variant="danger" onClick={onClear}>Reset</Button>


  </>
);

function Right(props) {
  const [id, setId] = useState(null);
  const toastShow = useSelector((state) => state.ui.showAddToast);
  const [open, setOpen] = React.useState(false);
  const [olpName, setOLPVal] = useState([]);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector(
    (state) => state.auth
  );
  const rightusers = useSelector(state => state.Rightreducer.data);
  useEffect(() => {
    if (rightusers != undefined) {
      setOLPVal(rightusers)
    }
  }, [rightusers]);
  const handleToasterClose = () => {
    dispatch(uiActions.hideAddToaster());
  };


  const user = JSON.parse(localStorage.getItem('user'));
  const accesToken = JSON.parse(localStorage.getItem('user'));
  const [rightData, setRightData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredItems = rightData.filter(
    (item) =>
    (item.name &&
      item.name.toLowerCase().includes(filterText.toLowerCase()))
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
    deleteRight({ id }, user)
      .then((response) => response.json()).then((responseJson) => {
        setOpen(false);
        loadOlp();
        //props.OLPDelete(responseJson.items);
        dispatch(uiActions.showAddToaster("Deleted Successfully !"));
      })
  }

  const columns = [
    {
      name: "Rights Name",
      selector: row => `${row.name}`,
      sortable: true,
    },
    // {
    //   name: "Mentor",
    //   // selector: "mentor",
    //   cell: (row) => (
    //     <>
    //       {mentorbyId(row)}

    //     </>
    //   ),
    // },

    {
      name: "Actions",

      cell: (row) => (
        <>
          <Link to={`/edit-rights/` + row._id} className="btn btn-outline-success btn-sm" title='Edit Right'><FontAwesomeIcon icon={faEdit} size="sm" /></Link>
          &nbsp;
          {/* <button className="btn btn-outline-success btn-sm"><FontAwesomeIcon icon={faEdit} size="sm" />Notify</button> */}
          &nbsp;
          <span
            aria-label="delete"
            color="secondary"
            title='Delete Right'
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

  const mentorbyId = (mentor) => {
    let arrmentor = [];
    mentor.mentor.map((val) => arrmentor.push(val))
  };






  useEffect(() => {
    loadOlp();
  }, []);

  const loadOlp = () => {
    enableLoading();
    showRight(user)
      .then((response) => response.json()).then((responseJson) => {
        //console.log(responseJson.items[0].trainingname, 'res JNSO');
        disableLoading();
        setRightData(responseJson.items);
        props.RightShow(responseJson.items);

      })
      .catch((err) => {
        toast.error("Some Thning Went Wrong");
      });

  };





  return (

    <>
      <Card>
        <CardHeader title="Rights List" />
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
              title="Right Delete"
              msg={"Are you sure to permanently delete this Right?"}
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
export default connect(mapStateToProps, { RightDelete, RightShow })(Right);
