import React from 'react';

const centerTextStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', // 使内容占据整个视口的高度
};

export default function Home() {
  return (
    <div style={centerTextStyle}>
      <div>
        Welcome to Alumni Administration Platform
      </div>
    </div>
  );
}
