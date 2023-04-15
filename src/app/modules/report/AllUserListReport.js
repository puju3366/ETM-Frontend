import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { UserShow } from "./redux/functions";
import { USERShow } from "./redux/action";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Toaster from "../components/Toaster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/fontawesome-free-solid";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { uiActions } from "../Employee/redux/uiSlice";
import ExcelJS from "exceljs";




const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input type="text" className="form-control" placeholder="Search Users" id="search" value={filterText} onChange={onFilter} style={{ height: 40, width: 250 }}  ></input>
    <Button variant="danger" onClick={onClear}>Reset</Button>
  </>
);
function AllUserReportList(props) {
  const [usersVal, setUsersVal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersValList, setUsersValProps] = useState([]);
  const usersListing = useSelector(state => state.Usersreducer.data);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user.user._id;

  useEffect(() => {
    if (usersListing != undefined) {
      setUsersVal(usersListing)
    }

  }, [usersListing]);
  const [filterText, setFilterText] = useState("");
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const filteredItems = usersValList.filter(
    (item) =>
      (item.firstname &&
        item.firstname.toLowerCase().includes(filterText.toLowerCase())) ||

      (item.lastname &&
        item.lastname.toLowerCase().includes(filterText.toLowerCase())) ||

      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase()))
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
        excelreport={createexcelreport}
        viewreport={createUserReport}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "Name",
      selector: row => `${row.firstname} ${row.lastname}`,
      sortable: true,

    },

    {
      name: "Email",
      selector: row => `${row.email}`,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/view-user-report/` + row._id} className="btn btn-outline-success btn-sm" title='View User'><FontAwesomeIcon icon={faEye} size="sm" /></Link>
        </>
      ),
    },
  ];

  const handleToasterClose = () => {
    dispatch(uiActions.hideAddToaster());
  };
  const toastShow = useSelector((state) => state.ui.showAddToast);
  const toastMSG = useSelector((state) => state.ui.toastMsg)

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    enableLoading();
    UserShow(user)
      .then((response) => response.json()).then((responseJson) => {
        if (responseJson.status_code === 200) {
          disableLoading();
          setUsersValProps(responseJson.items);
          props.USERShow(responseJson.items);
        } else {
          setUsersValProps(false);
          props.USERShow();
        }
      });
  };


  return (

    <>

      <Card>
        <CardHeader title="User Reports" />
        {toastMSG && (
          <Toaster
            show={toastShow}
            close={handleToasterClose}
            bgcolor="#1BC5BD"
            txtcolor="white"
            bodyMsg={toastMSG}
          />
        )}
        <div className="dashboard">
          <div className="smartphone-menu-trigger" />

          <main>
            <div className="main-sec">
              <div className="container-fluid">
                <div className="mainsec-content">
                  <div className="table-responsive">

                    <DataTable
                      //title="Users"
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
export default connect(mapStateToProps, { USERShow })(AllUserReportList);
