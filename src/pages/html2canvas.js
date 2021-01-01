import React from 'react';
import { jsPDF } from "jspdf";
const html2canvas = require('html2canvas')
import yayImg from '../assets/yay.jpg'

function Index() {
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [fileBlob, setFileBlob] = React.useState('')
  async function transform() {
    const data = await html2canvas(document.querySelector('#target'), {
      width: 500,
    })
    data.toBlob(blob => setFileBlob(blob))
    setPreviewUrl(data.toDataURL("image/png"))
  }
  function createPdf() {
    const pdf = new jsPDF('landscape', 'pt', [500, 102])
    pdf.addImage(previewUrl, 'PNG', 0, 0, 500, 102)
    // setFileBlob(pdf.output("blob")) pdf生成流
    pdf.save("test.pdf") //下载
    alert('生成pdf成功')
  }
  function uploadFile() {
    const fileData = new FormData()
    fileData.append('file', fileBlob)
    window.fetch('/uploadPdf', {
      method: 'POST',
      'content-type': 'form-data',
      body: fileData
    }).then(data=>data.json())
    .then(data=>{
      alert('上传成功',data.url)
    })
  }
  return <div>
    <p style={{ border: '1px solid black', width: 500 }} id='target'>
      hello world
      <img src={yayImg} style={{ width: 100 }} />
    </p>
    <h5>预览</h5>
    <img src={previewUrl} style={{ width: 500 }} />
    <button onClick={transform}>生成html</button>
    <button onClick={createPdf}>生成pdf</button>
    <button onClick={uploadFile}>上传html或pdf</button>
  </div>
}

export default Index
