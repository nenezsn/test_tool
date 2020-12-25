import React from 'react'
import Draggable from 'react-draggable';
// Draggable
export default function () {
  const [postion, setPostion] = React.useState({ x: 0, y: 0 })
  const postionRef = React.useRef({ x: 0, y: 0 })
  function handleStop(e, data) {
    console.log('e', data.x, data.y)
  }
  return <div>
    <div style={{ position: 'absolute', margin: '100px', border: '1px solid black', width: 300, height: 300 }}>
      <Draggable
        handle=".handle"
        defaultPosition={{ x: 20, y: 20 }}
        position={postion}//可控
        grid={[1, 1]}
        // axis='x'// both  x y none
        // bounds={{ left: 0, top: 0, right: 250, bottom: 250 }}//限制边界 在最近absolute父盒子为准
        // onStart={handleStart}
        // onDrag={handleDrag}
        onStop={handleStop}
      >
        <div
          style={{ width: 50, height: 50, background: '#3dcc61', cursor: 'pointer' }}
          className='handle'
        ></div>
      </Draggable>
    </div>
    x:<input onChange={e => postionRef.current = { x: e.target.value, y: postion.y }} />
    Y:<input onChange={e => postionRef.current = { x: postion.x, y: e.target.value }} />
    <button onClick={() => setPostion(postionRef.current)}>执行</button>
  </div>
}

