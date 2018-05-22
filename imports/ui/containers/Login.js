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
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import { withTracker } from 'meteor/react-meteor-data';

import { BrowserRouter as Link } from 'react-router-dom';

class LoginContainer extends Component {
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

    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  }
  handleSubmitName(e) {
    e.preventDefault();
    const gameSuiteID = this.state.id;
    Meteor.call('Meteor.users.CreateGameSuiteID', gameSuiteID);

    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };
  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === 2 ? 'Add Games' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { finished, stepIndex } = this.state;
    if (!this.props.userLoggedin || !this.props.userLoggedin.length) {
      return (
        <div
          style={{
            fontSize: '40px',
            display: 'flex',
            justifyContent: 'center',
            margin: '50px, 0'
          }}
        >
          Please Login at the top right
        </div>
      );
    } else {
      return (
        <div
          style={{
            minWidth: 380,
            maxHeight: 400,
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Select a Screen Name</StepLabel>
              <StepContent>
                <form onSubmit={this.handleSubmitName}>
                  <TextField
                    value={this.state.id}
                    onChange={this.handleChangeId}
                    hintText="GameSuiteID"
                  />
                </form>

                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Add a Bio!</StepLabel>
              <StepContent>
                <form onSubmit={this.handleSubmitBio}>
                  <TextField
                    value={this.state.bio}
                    onChange={this.handleChangeBio}
                    hintText="'ie, My favourite CS map is dust2'"
                  />
                </form>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Confirm Account Details</StepLabel>
              <StepContent>{this.renderStepActions(2)}</StepContent>
            </Step>
          </Stepper>
          <Card
            style={{
              minWidth: 480,
              maxHeight: 360
            }}
          >
            <CardHeader
              title={this.state.id === '' ? 'Your ID goes here' : this.state.id}
            />
            <CardText>
              {this.state.bio === '' ? 'Your bio goes here' : this.state.bio}
            </CardText>
          </Card>
        </div>
      );
    }
  }
}

const Login = withTracker(() => {
  Meteor.subscribe('users');
  return {
    userLoggedin: Meteor.users.find().fetch()
  };
})(LoginContainer);

export default LoginContainer;
