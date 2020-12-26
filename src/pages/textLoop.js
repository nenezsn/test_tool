import React from 'react';
import TextLoop from "react-text-loop";

export default () => <TextLoop
  springConfig={{ stiffness: 340, damping: 30 }}
  mask={true} fade={true}
  adjustingSpeed={150} delay={500}
  interval={[2000, 2000, 2000]}>
  <span style={{ color: '#3dcc61' }}>新闻1</span>
  <span style={{ color: 'red' }}>新闻2</span>
  <span style={{ color: 'blue' }}>新闻3</span>
</TextLoop>;
