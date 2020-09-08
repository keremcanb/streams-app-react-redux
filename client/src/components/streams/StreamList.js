import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

const StreamList = ({ fetchStreams, currentUserId, streams, isSignedIn }) => {
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const renderAdmin = (stream) => {
    const { userId, id } = stream;

    return (
      userId === currentUserId && (
        <div className="right floated content">
          <Link to={`/streams/edit/${id}`} className="ui button">
            Edit
          </Link>
          <Link to={`/streams/delete/${id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      )
    );
  };

  const renderList = () =>
    streams.map((stream) => {
      const { id, title, description } = stream;

      return (
        <div className="item" key={id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div>
            <Link to={`/streams/${id}`} className="header">
              {title}
            </Link>
            <div className="description">{description}</div>
          </div>
        </div>
      );
    });

  const renderCreate = () =>
    isSignedIn && (
      <div style={{ textAlign: 'right' }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    );

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
