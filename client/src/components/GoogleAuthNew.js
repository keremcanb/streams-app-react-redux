/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = (props) => {
  useEffect(() => {
    const onAuthChange = (isSignedIn) => {
      isSignedIn ? props.signIn() : props.signOut();
    };

    window.gapi.load('client:auth2', (auth) => {
      window.gapi.client
        .init({
          clientId:
            '743719953422-hjm1je7u58shr633ee50h3mus8rbpqtf.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();

          onAuthChange(auth.isSignedIn.get());

          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [props]);

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton = () => {
    const { isSignedIn } = props;

    if (isSignedIn === null) {
      return null;
    }

    return isSignedIn ? (
      <button onClick={onSignOutClick} className="ui red google button">
        <i className="google icon" />
        Sign Out
      </button>
    ) : (
      <button onClick={onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign in with Google
      </button>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
