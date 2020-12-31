/**
 * FileReader && blob
 */

import React from 'react';

function Index (){
  const inputref =React.useRef()
  const [url,setUrl] =React.useState('')
  function generate(){
    const blob = new Blob(['hello world'])
    const url = URL.createObjectURL(blob)
    setUrl(url)
  }
  function toPreivew(){
    const reader = new FileReader()
    reader.readAsText(inputref.current.files[0])
    reader.onload=function(){
      const content = reader.result
      console.log('content',content)
    }
  }
  return <div>
    <button onClick={generate}>生成blob url</button>
    <a href={url} download='hello.txt'>下载文件</a>
    <div></div>
    <input type='file' ref={inputref}/>
    <button onClick={toPreivew}>预览</button>
  </div>
}
export default Index
