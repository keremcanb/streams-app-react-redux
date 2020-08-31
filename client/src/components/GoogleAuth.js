import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '743719953422-hjm1je7u58shr633ee50h3mus8rbpqtf.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    isSignedIn ? this.props.signIn() : this.props.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    }

    if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }

    return (
      <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign in with Google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

GoogleAuth.propTypes = {
  isSignedIn: PropTypes.any,
  signIn: PropTypes.func,
  signOut: PropTypes.func
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
