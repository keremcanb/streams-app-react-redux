import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = ({ stream, match, fetchStream, deleteStream }) => {
  const { id } = match.params;

  useEffect(() => {
    fetchStream(id);
  }, [id, fetchStream]);

  const renderActions = () => (
    <>
      <button onClick={() => deleteStream(id)} className="ui button negative">
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  );

  const renderContent = () =>
    !stream
      ? 'Are you sure you want to delete this  stream?'
      : `Are you sure you want to delete the stream with title: ${stream.title}`;

  return (
    <Modal
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push('/')}
      title="Delete Stream"
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
