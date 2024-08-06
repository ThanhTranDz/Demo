import React from 'react';

const ColorDisplay = ({ color }) => {
  return (
    <div style={{ backgroundColor: color, width: '100px', height: '100px', marginTop: '20px' }}>
      Màu đã chọn: {color}
    </div>
  );
};

export default ColorDisplay;
