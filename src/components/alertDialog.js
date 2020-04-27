import React, {Component,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {reset} from '../redux/user.redux';
import { connect } from 'react-redux';


@connect (
    state => state,
    {reset}
)
class AlertDialog extends Component{
    componentDidMount(){
        this.props.reset();
    }

    render() {
        let open= this.props.user.msgShow
        return (
            <div>
                {/*<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>*/}
                {/*    Open alert dialog*/}
                {/*</Button>*/}
                <Dialog
                    open= {open}
                    onClose={this.handleClose.bind(this)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Notice:</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.user.msg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose.bind(this)} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    handleClickOpen (){

    };

    handleClose(){
        this.props.reset();
    };
}

export default AlertDialog;






//
//
//
// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
//
// export default function AlertDialog() {
//     const [open, setOpen] = React.useState(false);
//
//     const handleClickOpen = () => {
//             setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//
//     return (
//         <div>
//             <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//                 Open alert dialog
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         {msg()}
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary" autoFocus>
//                         OK
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }
//
//
//
