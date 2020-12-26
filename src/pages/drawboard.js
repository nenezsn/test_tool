import React from 'react'
function Index() {
  const ctxRef = React.useRef()
  const startPointRef = React.useRef({ x: undefined, y: undefined })
  const [painting, setPainting] = React.useState(false)
  const [eraser, setEraser] = React.useState(false)
  React.useEffect(() => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctxRef.current = ctx
    canvas.onmousedown = onmousedown
    canvas.onmousemove = onmousemove
    canvas.onmouseup = onmouseup
    canvas.onmouseleave = onmouseup
    // initDraw()
  }, [painting,eraser])
  function onmousedown(e) {
    let ctx = ctxRef.current
    let x = e.offsetX;
    let y = e.offsetY;
    setPainting(true)
    if (eraser) {
      ctx.clearRect(x - 15, y - 15, 30, 30)
    }
    startPointRef.current = { x: x, y: y };
  };
  function onmousemove(e) {
    let ctx = ctxRef.current
    let x = e.offsetX;
    let y = e.offsetY;
    let newPoint = { x: x, y: y };
    if (painting) {
      if (eraser) {
        ctx.clearRect(x - 15, y - 15, 30, 30)
      } else {
        drawLine(startPointRef.current.x, startPointRef.current.y, newPoint.x, newPoint.y);
      }
      startPointRef.current = newPoint
    }
  };
  function onmouseup() {
    setPainting(false)
  };
  function drawLine(xStart, yStart, xEnd, yEnd) {
    let ctx = ctxRef.current
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
    ctx.closePath();
  }
  function clear() {
    let ctx = ctxRef.current
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  function download(){
    let canvas = document.getElementById('canvas');
    const aDom =  document.createElement('a')
    aDom.href =  canvas.toDataURL("image/png")
    aDom.download = '草图'
    aDom.click()
  }
  return <div >
    <canvas id="canvas" width="300" height="300" style={{ border: '1px solid black' }}></canvas>
    <button onClick={clear}>清屏</button>
    <button onClick={() => setEraser(true)}>橡皮擦</button>
    <button onClick={() => setEraser(false)}>绘制</button>
    <button onClick={download}>下载</button>
  </div>
}
export default Index
