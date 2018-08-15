import React from 'react';

import Header from './Header';
import DrawArea from './DrawArea';
import ColorPicker from './ColorPicker';

export default class PaintApp extends React.Component {
  state = {
    lines: [],
    removedLines: [],
    colors: ['#000000', '#B326DD', '#36F63F', '#4A2EAA', '#B5A35E', '#DDA626', '#339DDD', '#38AA98', '#B57369', '#DD3335'],
    selectedColor: '#000000',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (keyboardEvent) => {
    if (keyboardEvent.ctrlKey && keyboardEvent.keyCode === 90) {
      if (!keyboardEvent.shiftKey && this.state.lines.length > 0) {
        this.removeLastLine();
      } else if (keyboardEvent.shiftKey && this.state.removedLines.length > 0) {
        this.redoLastLine();
      }
    }
  };
  
  createNewLine = (initPoint) => {
    this.setState((prevState) => (
      {
        lines: [
          ...prevState.lines,
          {
            points: [initPoint],
            color: prevState.selectedColor,
          },
        ],
        removedLines: [],
      }
    ));
  };

  updateLastLine = (point) => {
    this.setState((prevState) => {
      const firstLines = prevState.lines.slice(0, prevState.lines.length -1);
      const lastLine = prevState.lines[prevState.lines.length - 1];
      
      return {
        lines: [
          ...firstLines,
          {
            points: [...lastLine.points, point],
            color: lastLine.color
          }
        ],
      };
    });
  };

  removeLastLine = () => {
    this.setState((prevState) => {
      const firstLines = prevState.lines.slice(0, prevState.lines.length -1);
      const lastLine = prevState.lines[prevState.lines.length - 1];
      console.log('LastLine: ', lastLine)
      return {
        lines: firstLines,
        removedLines: [...prevState.removedLines, lastLine],
      }
    })
  };

  redoLastLine = () => {
    this.setState((prevState) => {
      const firstRemovedLines = prevState.removedLines.slice(0, prevState.removedLines.length -1);
      const lastRemovedLine = prevState.removedLines[prevState.removedLines.length - 1];

      return {
        lines: [...prevState.lines, lastRemovedLine],
        removedLines: firstRemovedLines,
      }
    })
  };

  handleColorPick = (color) => {
    this.setState(() => ({ selectedColor: color }));
  }
  
  render() {
    return (
      <div>
        <Header/>
        <div className="container flex">
          <div className="draw-panel">
            <DrawArea
              lines={this.state.lines}
              handleMouseDown={this.createNewLine}
              handleMouseMove={this.updateLastLine}
            />
            <div className="draw-panel__options">         
              <button
                className="fa-button"
                onClick={this.removeLastLine}
                disabled={this.state.lines.length === 0}
                title="Undo(Ctrl+Z)"
              >
                <i className="fa fa-undo fa-lg fa-inverse"></i>
              </button>
              <button
                className="fa-button"
                onClick={this.redoLastLine}
                disabled={this.state.removedLines.length === 0}
                title="Redo(Ctrl+Shift+Z)"
                >
                <i className="fa fa-undo fa-lg fa-inverse fa-flip-horizontal"></i>
              </button>
            </div>
          </div>
          <div className="side-panel">
            <p className="side-panel__text">Color:</p>
            <ColorPicker
              colors={this.state.colors}
              selectedColor={this.state.selectedColor}
              handleColorPick={this.handleColorPick}
            />
            <p className="side-panel__text">Line weight:</p>
            <div className="side-panel__box"></div>
          </div>
        </div>
      </div>
    );
  }
}
