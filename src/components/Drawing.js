import React from 'react';

import DrawingLine from './DrawingLine';

const Drawing = ({ lines }) => (
  <svg className="drawing">
    {
      lines.map((line, index) => (
        <DrawingLine key={index} points={line.points} color={line.color} weight={line.weight}/>
      ))
    }
  </svg>
);

export default Drawing;