import React from "react";
import Button from "react-bootstrap/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DailogBox = (props) => {
  
  return (
    <>
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="">
          Cancel
        </Button>
        <Button onClick={props.delete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default DailogBox;
