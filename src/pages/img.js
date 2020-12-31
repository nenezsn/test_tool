import React from 'react'

const headerImg = 'https://pbu-public.oss-cn-beijing.aliyuncs.com/webapps/default_images/ncc.png'

function ImgC() {
  const [img1, setImg1] = React.useState()
  function getRemoteImg() {
    // window.fetch('/local/getRemoteImg?url=' + headerImg)
    //   .then(data => data.blob())
    //   .then(data => {
    //     setImg1(URL.createObjectURL(data))
    //   })
    window.fetch('/local/getRemoteImg2?url=' + headerImg).then(data => data.blob())
      .then(data => {
        console.log('data', data)
        setImg1(URL.createObjectURL(data))
      })
  }
  function getLocalImg() {
    window.fetch('/local/getLocalImg')
      .then(data => data.blob())
      .then(data => {
        console.log('data', data)
        setImg1(URL.createObjectURL(data))
      })
    // window.fetch('/local/pdf.png').then(data => data.blob())
    // .then(data => {
    //   console.log('data',data)
    //   setImg1(URL.createObjectURL(data))
    // })
  }

  return <div>
    <button onClick={getRemoteImg}>获取远端文件</button>
    <img src={img1} />
    <button onClick={getLocalImg}>获取服务端文件</button>
  </div>
}

export default ImgC
