import React from 'react';
import Drawing from './Drawing';

export default class DrawArea extends React.Component {

  state = {
    isDrawing: false,
  };

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (mouseEvent) => {
    if (mouseEvent.button !== 0) {
      return;
    }

    const initPoint = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(() => ({ isDrawing: true }));

    this.props.handleMouseDown(initPoint);
  };

  handleMouseMove = (mouseEvent) => {
    if (!this.state.isDrawing) {
      return;
    }
    
    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.props.handleMouseMove(point);
  };

  handleMouseUp = () => {
    this.setState(() => ({ isDrawing: false }));
  }

  relativeCoordinatesForEvent = (mouseEvent) => {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    };
  }

  render() {
    return (
      <div
        ref="drawArea"
        className="draw-area"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      >
        <Drawing lines={this.props.lines} />
      </div>
    );
  }
}