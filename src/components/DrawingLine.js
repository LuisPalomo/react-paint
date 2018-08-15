import React from 'react';

const DrawingLine = ({ points, color, weight }) => {
  const pathData = 
    'M ' +
    points
      .map((point) => `${point.x} ${point.y}`)
      .join(' L ');
  
  return <path className="path" d={pathData} stroke={color} stroke-width={weight}/>;
}

export default DrawingLine;