//data:url => blob
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime })
  return blob;
}
//data:url => file
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
//blob && file => data:url
export function blobtoDataUrl(blob) {
  var filer = new FileReader();
  filer.readAsDataURL(blob);
  return new Promise(resolve => {
    filer.onload = function (e) {
      let dataUrl = e.target.result
      resolve(dataUrl)
      console.log('dataUrl', dataUrl)
    };
  })
}
//blob && file => Object:url
export function blobtoObjectUrl(blob) {
  const objUrl = URL.createObjectURL(blob)
  console.log('objUrl', objUrl)
  return objUrl
}
// url也可以是import进来的
export function objUrlAndDataUrlToblob(url) {
  let image = new Image()
  image.src = url
  image.crossOrigin = 'Anonymous'//需要服务器明确加上access-allow-origin:*
  return new Promise(resolve => {
    image.onload = function () {
      const canvas = document.createElement('canvas')
      document.body.append(canvas)
      const ctx = canvas.getContext('2d')
      canvas.height = image.height
      canvas.width = image.width
      ctx.drawImage(image, 0, 0)
      const dataurl = canvas.toDataURL('image/jpg')
      console.log('canvas图片加载完成', dataurl)
      resolve(dataurl)
    }
  })
}


export async function htmlConverCanvas(dom, type = 'blob', options) {
  const html2canvas = require('html2canvas')
  options = {
    useCORS: true, //需要服务器明确加上access-allow-origin:*
    allowTaint: true,
    // x:10,
    width: 350,
    height: 150,
    backgroundColor: 'transparent',
    ...options
  }
  const canvas = await html2canvas(dom, options)

  if (type == 'blob') {
    const blob = await new Promise(resolve => {
      canvas.toBlob(data => {
        resolve(data)
      })
    })
    return blob
  }
  return canvas.toDataURL("image/png")
}
