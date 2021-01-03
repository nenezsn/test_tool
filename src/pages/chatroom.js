import React from 'react';

function Index() {
  const [status, setStatus] = React.useState(false)
  const [msgs, setMsgs] = React.useState([])
  const ws = React.useRef()
  const inputRef = React.useRef()
  const listRef = React.useRef()
  function open() {
    ws.current = new WebSocket('ws://localhost:8002');
    ws.current.onopen = () => {
      setStatus(true)
    }
    ws.current.onmessage = ({ data }) => {
      setMsgs(JSON.parse(data));
    }
    ws.current.onerror = (err) => {
      console.log('出错了', err)
    }
    ws.current.onclose = () => {
      setStatus(false)
    }
  }
  React.useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [msgs])

  function close() {
    ws.current.close()
  }
  function send(e) {
    if (e.keyCode == 13) {
      ws.current.send(e.target.value)
      inputRef.current.value = ''
    }
  }
  return <div>
    <p>{status ? '开启中' : '关闭中'}</p>
    <button onClick={close}>关闭</button>
    <button onClick={open}>开启</button>
    <input style={{ width: 100 }} onKeyUp={send} ref={inputRef} />
    <ul style={{ height: 200, overflow: 'scroll' }} ref={listRef} id='list'>
      {msgs.map((item, index) => <li key={index}>{index + 1}:{item}</li>)}
    </ul>
  </div>
}

export default Index
