import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = ({ fetchStream, editStream, match, stream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  });

  const onSubmit = (formValues) => {
    editStream(match.params.id, formValues);
  };

  return stream ? (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(stream, 'title', 'description')}
        onSubmit={onSubmit}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
