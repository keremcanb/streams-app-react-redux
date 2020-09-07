import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = ({ fetchStream, match, stream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, [fetchStream, match]);

  return stream ? (
    <div>
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
