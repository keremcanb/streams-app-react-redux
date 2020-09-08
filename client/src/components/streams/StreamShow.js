/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const urlId = this.props.match.params.id;
    this.props.fetchStream(urlId);
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${this.props.stream.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    const { stream, title, description } = this.props;

    return stream ? (
      <div>
        <video ref={this.videoRef} style={{ width: '50%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const urlId = ownProps.match.params.id;
  return { stream: state.streams[urlId] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
