import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Col, Row, InputGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector, connect } from "react-redux";
import { uiActions } from "../../../modules/Employee/redux/uiSlice";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Link, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import moment from 'moment';


import { viewProgress } from "../api/api";
//import { viewTrainingProgress } from "../redux/action";
import { viewTrainingProgress } from "../redux/function";

function ViewProgress(props) {
  let { id } = useParams()
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedValue, setSelectedValue] = useState([]);
  const [showSpan, setshowSpan] = useState(false);

  useEffect(() => {
    loadViewProgress();
  }, []);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const loadViewProgress = () => {
    enableLoading();
    viewTrainingProgress(id, user)
      .then((response) => response.json()).then((responseJson) => {
        // console.log(responseJson, "testarry");
        if (responseJson.items[0]) {
          setshowSpan(false);
          setSelectedValue(responseJson.items);
        } else {
          setshowSpan(true);
        }
        disableLoading();
        // setSelectedValue(Array.isArray(responseJson.items[0].mentor) ? responseJson.items[0].mentor.map(x => x._id) : []);
        //  props.ShowOLPById(responseJson.items[0]);

      })


  };
  // console.log(selectedValue, "val");
  return (
    <>
      <Card>

        {/* begin::Header */}
        <div className="card-header py-3">
          <div className="card-title align-items-start flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              Training Progress
            </h3>

          </div>

        </div>
        <span
          className="text-danger text-center"
          style={{ display: showSpan ? "block" : "none" }}
        >
          No Record Found
        </span>
        <div className="form">
          {/* begin::Body */}
          <div className="card-body">
            <div className="row">
              <label className="col-xl-3"></label>
            </div>
            {loading && <div className="spinner spinner-primary spinner-lg spinner-center"></div>}

            <div className="timeline timeline-5">
              <div className="timeline-items">
                {selectedValue.map((val, index) =>
                  <div className="timeline-item" key={index}>

                    <div className={`timeline-media bg-light-${index === 0 ? 'primary' : index === 1 ? 'warning' : index === 3 ? 'success' : 'danger'}`}>

                      <span className="svg-icon-primary svg-icon-md"  >
                        {/* {moment(val.start_week).format('MMMM')}   */}
                        {"week" + (index + 1)}
                      </span>
                    </div>
                    <div className="timeline-desc timeline-desc-light-primary">
                      <span className="font-weight-bolder text-danger">{" From " + moment(val.start_week).format('DD-MM-YYYY') + " To " + moment(val.end_week).format('DD-MM-YYYY')}</span>
                      <p className="font-weight-normal text-dark-50 pb-2">
                        {`Video Completed-` + val.completed_videos}
                      </p>
                    </div>

                  </div>
                )}
              </div>
            </div>
            &nbsp;
            <div className="card-toolbar">

              <Link
                to="/my-training"
                className="btn btn-secondary"
              >
                Go Back
              </Link>
            </div>
          </div>
          {/* end::Body */}
        </div>

        {/* end::Form */}

      </Card>

    </>
  )
};


const mapStateToProps = formValues => ({
  intialValues: formValues
});
export default connect(mapStateToProps, {})(ViewProgress);
