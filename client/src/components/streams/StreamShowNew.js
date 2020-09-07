/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = ({ fetchStream, match, stream }) => {
  const videoRef = React.createRef();

  useEffect(() => {
    const { id } = match.params;

    fetchStream(id);

    const buildPlayer = () => {
      if (player || !stream) {
        return;
      }

      const { id } = match.params;

      const player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`
      });
      player.attachMediaElement(videoRef.current);
      player.load();
    };

    buildPlayer();
  }, [fetchStream, match, videoRef, stream]);

  return stream ? (
    <div>
      <video ref={videoRef} style={{ width: '60%' }} controls />
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
