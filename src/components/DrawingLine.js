import React from 'react';

const DrawingLine = ({ points, color }) => {
  const pathData = 
    'M ' +
    points
      .map((point) => `${point.x} ${point.y}`)
      .join(' L ');
  
  return <path className="path" d={pathData} stroke={color}/>;
}

export default DrawingLine;