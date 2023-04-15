import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ProgressBar from "react-bootstrap/ProgressBar";
import Typography from "@material-ui/core/Typography";
import { viewEmpProgress } from "../../modules/olp/redux/functions";
import moment from "moment";

const ModalBox = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
 // console.log(props.empData);
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.close}
        maxWidth="md"
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
        {(() => {
        if (props.progress.length  >= 1) {
            return (
                <Typography gutterBottom component={"div"}>
                    <div className="timeline timeline-5">
              <div className="timeline-items">

                  {props.progress.map((val, index)=>
                  
                  
                  <div className="timeline-item" key={index}>
                  <div className={`timeline-media bg-light-${index === 0 ? 'primary' : index === 1 ? 'warning' : index === 3 ? 'success' : 'danger'}`}>
                  {"week" + (index + 1)}
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
              <Typography gutterBottom component={"div"}>
            Total Videos:{props.empData.TotalVideos}
          
          </Typography>
              <Typography gutterBottom component={"div"}>
             Progress bar Of Assigned Videos to Employees 
            <ProgressBar>
            <ProgressBar variant="success" now={props.empData.progress} key={2} label={`${props.empData.progress}completed%`} />
            <ProgressBar striped variant="danger" now={props.empData.TotalvideosPecentage} key={1} label={`${props.empData.TotalvideosPecentage}Pending%`} />
            {/* <ProgressBar striped variant="danger" now={props.empData.TotalvideosPecentage} key={1} label={`${props.empData.TotalvideosPecentage}Pending%`} /> */}
            
              
            </ProgressBar>
          </Typography>
          </Typography>
          
          
            )
        }else{
            return (
            <Typography gutterBottom component={"div"}>
                <span>This employee not done the progress</span>
            </Typography>
            )
        }
    })()}
         
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalBox;
