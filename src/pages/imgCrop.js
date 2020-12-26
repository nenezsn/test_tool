import React from 'react'
import '../../node_modules/cropperjs/dist/cropper.css'//引入样式（要对应自己的文件格式）
import Cropper from 'react-cropper' // 引入Cropper
import { Upload, Button } from 'antd';

function Index() {
  const [cropSrc, setCropSrc] = React.useState('')
  const [cropVisible, setCropVisible] = React.useState(false)
  const [afterCropImg, setAfterCropImg] = React.useState('')
  const cropRef = React.useRef()
  function beforeUpload(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => {
      setCropSrc(e.target.result)
      setCropVisible(true)
    }
  }
  function cropend(e) {
    let afterImg = cropRef.current.getCroppedCanvas().toDataURL()
    setAfterCropImg(afterImg)
  }
  function upload() {
    cropRef.current.getCroppedCanvas().toBlob(async blob => {
      let formData = new FormData()
      formData.append('file', blob)
    })
  }
  return <div>
    <Upload beforeUpload={beforeUpload}>
      <Button>上传</Button>
    </Upload>
    {
      cropVisible &&
      <Cropper
        src={cropSrc}
        onInitialized={cropper => cropRef.current = cropper}
        // 图片路径，即是base64的值，在Upload上传的时候获取到的
        style={{ height: 200, width: 200 }}
        preview='.cropper-preview'
        className='company-logo-cropper'
        viewMode={1} // 定义cropper的视图模式
        zoomable// 是否允许放大图像
        aspectRatio={1} // image的纵横比
        guides // 显示在裁剪框上方的虚线
        background // 是否显示背景的马赛克
        rotatable={false}
        cropend={cropend}
      />
    }
    <p>预览：<img src={afterCropImg} style={{ width: 50 }} /></p>
    <button onClick={upload}>提交</button>
  </div>
}

export default Index
