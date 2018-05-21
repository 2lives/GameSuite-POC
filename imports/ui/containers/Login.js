import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepButton,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { BrowserRouter as Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      bio: '',
      stepIndex: 0
    };
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleSubmitBio = this.handleSubmitBio.bind(this);
  }

  handleChangeId(event) {
    this.setState({ id: event.target.value });
  }
  handleChangeBio(event) {
    this.setState({ bio: event.target.value });
  }

  handleSubmitBio(e) {
    e.preventDefault();
    const gameSuiteBio = this.state.bio;
    Meteor.call('Meteor.users.CreateGameSuiteBio', gameSuiteBio);
  }
  handleSubmitName(e) {
    e.preventDefault();
    const gameSuiteID = this.state.id;
    Meteor.call('Meteor.users.CreateGameSuiteID', gameSuiteID);
  }

  // handleNext = () => {
  //   const { stepIndex } = this.state;
  //   if (stepIndex < 2) {
  //     this.setState({ stepIndex: stepIndex + 1 });
  //   }
  // };

  // handlePrev = () => {
  //   const { stepIndex } = this.state;
  //   if (stepIndex > 0) {
  //     this.setState({ stepIndex: stepIndex - 1 });
  //   }
  // };
  // renderStepActions(step) {
  //   const { stepIndex } = this.state;

  //   return (
  //     <div style={{ margin: '12px 0' }}>
  //       <RaisedButton
  //         label={stepIndex === 2 ? 'Finish' : 'Next'}
  //         disableTouchRipple={true}
  //         disableFocusRipple={true}
  //         primary={true}
  //         onClick={this.handleNext}
  //         style={{ marginRight: 12 }}
  //       />
  //       {step > 0 && (
  //         <FlatButton
  //           label="Back"
  //           disabled={stepIndex === 0}
  //           disableTouchRipple={true}
  //           disableFocusRipple={true}
  //           onClick={this.handlePrev}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  render() {
    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <form onSubmit={this.handleSubmitName}>
          <TextField
            value={this.state.id}
            onChange={this.handleChangeId}
            hintText="GameSuiteID"
            floatingLabelText="Create a GameSuiteID"
          />
        </form>
        {/* <LoginID /> */}
        <form onSubmit={this.handleSubmitBio}>
          <TextField
            value={this.state.bio}
            onChange={this.handleChangeBio}
            hintText="'ie, My favourite CS map is dust2'"
            floatingLabelText="Add a Bio"
          />
        </form>
      </div>
    );
  }
}
//   render() {
//     const { finished, stepIndex } = this.state;

//     return (
//       <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
//         <Stepper activeStep={stepIndex} orientation="vertical">
//           <Step>
//             <StepLabel>Select a Screen Name</StepLabel>
//             <StepContent>
//               <LoginID />
//               {this.renderStepActions(0)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepLabel>Create an ad group</StepLabel>
//             <StepContent>
//               <p>
//                 An ad group contains one or more ads which target a shared set
//                 of keywords.
//               </p>
//               {this.renderStepActions(1)}
//             </StepContent>
//           </Step>
//           <Step>
//             <StepLabel>Create an ad</StepLabel>
//             <StepContent>
//               <p>
//                 Try out different ad text to see what brings in the most
//                 customers, and learn how to enhance your ads using features like
//                 ad extensions. If you run into any problems with your ads, find
//                 out how to tell if they're running and how to resolve approval
//                 issues.
//               </p>
//               {this.renderStepActions(2)}
//             </StepContent>
//           </Step>
//         </Stepper>
//         {finished && (
//           <p style={{ margin: '20px 0', textAlign: 'center' }}>
//             <a
//               href="#"
//               onClick={event => {
//                 event.preventDefault();
//                 this.setState({ stepIndex: 0, finished: false });
//               }}
//             >
//               Click here
//             </a>{' '}
//             to reset the example.
//           </p>
//         )}
//       </div>
//     );
//   }
// }

export default Login;
