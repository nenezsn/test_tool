const express = require('express')
const formidable = require('express-formidable') //用于文件上传
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('./dist'))

app.use(formidable({
  encoding: 'utf-8',
  uploadDir: './dist',
  multiples: true
}))

app.post('/uploadPdf', (req, res, next) => {
  const file = req.files.file
  const filename = Math.random().toString(36).slice(2, 15)
  fs.readFile(file.path, function (error, buffer) {
    fs.writeFile(`./dist/${filename}.jpg`, buffer);
  });
  res.json({ code: 200, url: `${filename}.jpg` })
})

app.get('*', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, 'dist/index.html'))
})
app.listen(3000, () => {
  console.log('server is running in 3000')
})
