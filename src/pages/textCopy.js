import React from 'react'
import { Input, Button } from 'antd'

function CopyText() {
  const copy_text = React.useRef()
  const [text, setText] = React.useState()
  function onHandleCopy() {
    copy_text.current.select();
    document.execCommand("Copy");
    console.log('复制成功')
  }
  return <div>
    <Input onChange={e => setText(e.target.value)} style={{ width: 120 }} />
    <textarea
      ref={copy_text}
      style={{ resize: 'none', border: 'none', outline: 'none', height: 0, width: 0 }}
      value={text}
    >
    </textarea>
    <Button onClick={onHandleCopy}>拷贝</Button>
  </div>
}

export default CopyText
