// import React, { Component } from 'react';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';

// import LeagueLogin from '../LeagueLogin';

// /**
//  * A modal dialog can only be closed by selecting one of the actions.
//  */
// export default class AccountConfirm extends Component {
//   state = {
//     open: false
//   };

//   handleOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     const actions = [
//       <FlatButton label="Close" primary={true} onClick={this.handleClose} />
//     ];
// const leagueName = Meteor.users.findOne({ _id: Meteor.userId() }).profile
//   .league.AccData.Name;

//     return (
//       <div>
//         <RaisedButton label="Register an Account" onClick={this.handleOpen} />
//         <Dialog
//           title="You have registered an account!"
//           actions={actions}
//           modal={true}
//           open={this.state.open}
//         >
//           <p>`Submitted Name was ${leagueName}`</p>
//         </Dialog>
//       </div>
//     );
//   }
// }
