import Zmage from 'react-zmage'
import { Upload, Button } from 'antd';
import yayImage from '../assets/yay.jpg'

export default function () {
  const [zoomImg, setZoomImg] = React.useState()
  function beforeUpload(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => {
      setZoomImg(e.target.result)
    }
  }
  return <div>
    <Upload beforeUpload={beforeUpload}>
      <Button>上传</Button>
    </Upload>
    <Zmage
      style={{ width: 100 }}
      src={zoomImg}
      set={[{src:zoomImg},{ src: yayImage }, { src: yayImage }]} //查看多张照片
      controller={{
        // 关闭按钮
        close: true,
        // 缩放按钮
        zoom: true,
        // 下载按钮
        download: true,
        // 旋转按钮
        rotate: true,
        // 翻页按钮
        flip: true,
        // 多页指示
        pagination: true,
      }}
    />
    {/* Zmage.browsing 等同于组件的props用法 */}
    <Button onClick={() => Zmage.browsing({ set: [{src:zoomImg},{ src: yayImage }, { src: yayImage }] })}>放大</Button>
  </div>
}
