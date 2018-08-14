import React from 'react';

const DrawingLine = ({ line }) => {
  const pathData = 
    'M ' +
    line
      .map((point) => `${point.x} ${point.y}`)
      .join(' L ');
  
  return <path className="path" d={pathData} />;
}

export default DrawingLine;