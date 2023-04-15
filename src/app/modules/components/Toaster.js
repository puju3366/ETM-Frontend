import { useSelector } from "react-redux";
import { Toast, Col, Row } from "react-bootstrap";
import React from "react";

const Toaster = (props) => {
  const toastmsg = useSelector((state) => state.ui.toastMsg);
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
          top: "4%",
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
            <Toast.Body>{toastmsg}</Toast.Body>
          </Toast>
        </Col>
      </div>
    </>
  );
};

export default Toaster;
