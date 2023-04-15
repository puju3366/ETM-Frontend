/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import moment from 'moment';
import PerfectScrollbar from "react-perfect-scrollbar";


const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};
export function ListsWidget9(props) {
  //console.log(props.olpData);
  return (
    <>
      {/* <PerfectScrollbar
        options={perfectScrollbarOptions}
        className="navi navi-hover scroll my-4"
        style={{ height: "600px", position: "relative" }}
      > */}
        <div className={`card card-custom"  ${props.className}`} style={{ height: "600px"}}>
          {/* Header */}
          <div className="card-header align-items-center border-0 mt-4">
            <h3 className="card-title align-items-start flex-column">
              <span className="font-weight-bolder text-dark">My Timeline</span>
              {/* <span className="text-muted mt-3 font-weight-bold font-size-sm">
              {props.olpData.length ? props.olpData.length+" Nos":""} 
            </span> */}
            </h3>

          </div>
          {/* Body */}


          {(() => {
            if (props.olpData.length > 0) {
              return (

                <PerfectScrollbar
                options={perfectScrollbarOptions}
                className="navi navi-hover scroll my-4"
                style={{ height: "600px", position: "relative" }}
              >

                <div className="card-body pt-4">
                  <div className="timeline timeline-6 mt-3">
                    {props.olpData.map((val, index) =>

                      <div className="timeline-item align-items-start" key={index}>
                        <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                          {moment(val.createdAt).format("HH:mm")}
                        </div>

                        <div className="timeline-badge">
                          {/* <i className="fa fa-genderless text- icon-xl" id={index}></i> */}
                          <i className={`fa fa-genderless text-${index === 0 ? 'success' : index === 1 ? 'danger' : index === 3 ? 'primary' : 'info'}`}></i>
                        </div>

                        <div className="timeline-content font-weight-mormal font-size-lg text-dark pl-3">
                          {/* <span className="font-weight-bolder text-dark-75 pl-3 font-size-lg"> */}
                          <div
                            dangerouslySetInnerHTML={{ __html: val.action }}
                          />
                          {/* </span> */}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                </PerfectScrollbar>
              )
            }
            else {
              return (
                <div className="timeline-content font-weight-mormal font-size-lg text-dark pl-3 text-center">
                  No Timelines Found
                </div>

              )
            }
          })()}

        </div>
      {/* </PerfectScrollbar> */}
    </>
  );
}
