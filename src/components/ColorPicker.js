import React from 'react';

const ColorPicker = ({ colors, selectedColor, handleColorPick}) => {
  return (
    <div className="color-picker">
      {
        colors.map((color, index) => (
          <button
            key={index}
            className="fa-button"
            style={{ background: color }}
            onClick={
              () => {
                handleColorPick(color);
              }
            }
          >
            {selectedColor === color && <i className="fa fa-check fa-lg fa-inverse"></i>}
          </button>
        ))
      }
    </div>
  );
}

export default ColorPicker;