const express = require('express')
const formidable = require('express-formidable') //用于文件上传
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const https = require('https')
const proxy = require('express-http-proxy') //代理

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./dist'))

app.use(formidable({
  encoding: 'utf-8',
  uploadDir: './dist',
  multiples: true
}))
// pdf上传
app.post('/uploadPdf', (req, res, next) => {
  const file = req.files.file
  const filename = Math.random().toString(36).slice(2, 15)
  fs.readFile(file.path, function (error, buffer) {
    fs.writeFile(`./dist/${filename}.jpg`, buffer);
  });
  res.json({ code: 200, url: `${filename}.jpg` })
})


app.get('/getLocalImg',(req,res,next)=>{
  const data = fs.readFileSync(path.resolve(__dirname,'upload/pdf.png'))
  res.send(data)
  // res.sendFile(path.resolve(__dirname,'upload/pdf.png'))
})
app.get('/getRemoteImg', (req, resp, next) => {
  https.get(req.query.url, function (res) {
    const buffer = []
    res.on('data', d => {
      buffer.push(d)
    })
    res.on('end', () => {
      resp.send(Buffer.concat(buffer))
    })
  })
})
app.use('/getRemoteImg2', proxy('https://pbu-public.oss-cn-beijing.aliyuncs.com', {
    //拼接代理地址
    proxyReqPathResolver: function (req) {
        return req.query.url
    },
    //拼接传递参数
    proxyReqBodyDecorator: function (bodyContent, srcReq) {
        return bodyContent
    },
    //处理接口的返回参数
    userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
        userRes.set('Access-Control-Allow-Origin', '*')
        console.log('proxyResData',proxyResData)
        return proxyResData
    },
})
)


app.get('*', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, 'dist/index.html'))
})
app.listen(3000, () => {
  console.log('server is running in 3000')
})
