import { useDispatch, useSelector } from "react-redux";
import { Toast, Col, Row } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { uiActions } from "../../../../modules/Employee/redux/uiSlice";



const Toaster = (props) => {
  //   const dispatch = useDispatch();
  //   const toastShow = useSelector((state) => state.ui.showAddToast);
  const toastColorStyle = {
    backgroundColor: `${props.bgcolor}`,
    color: `${props.txtcolor}`,
    //fontWeight: "bold",
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "9%",
          right: "2%",
        }}
      >
        <Col xs={12}>
          <Toast
            show={props.show}
            delay={3000}
            autohide
            onClose={props.close}
            style={toastColorStyle}
          >
            {/* <Toast.Header> */}
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            /> */}
            {/* <strong className="mr-auto"></strong> */}
            {/* <strong className="mr-auto">Bootstrap</strong> */}
            {/* <small>just now</small> */}
            {/* </Toast.Header> */}
            <Toast.Body>{props.bodyMsg}</Toast.Body>
          </Toast>
        </Col>
      </div>
    </>
  );
};

export default Toaster;
