
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/drag', component: '../pages/drag' },
        { path: '/color', component: '../pages/color' },
        { path: '/intl', component: '../pages/intl' },
        { path: '/sparklines', component: '../pages/sparklines' },
        { path: '/imgCrop', component: '../pages/imgCrop' },
        { path: '/zoomImage', component: '../pages/zoonImage' },
        { path: '/textLoop', component: '../pages/textLoop' },
        { path: '/textCopy', component: '../pages/textCopy' },
        { path: '/drawboard', component: '../pages/drawboard' },
        { path: '/html2canvas', component: '../pages/html2canvas' },
        { path: '/chatroom', component: '../pages/chatroom' },
        { path: '/richText', component: '../pages/richText' },
      ]

    }
  ],
  chainWebpack: (config) => {
    config.module.rules.store.delete('eslint')//禁用eslint
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'test-tool',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  cssLoaderOptions:{
    localIdentName:'[local]'
  },
  proxy: {
    "/local": {
      "target": "http://localhost:3000",
      "changeOrigin": true,
      "pathRewrite": { "^/local": "" }
    }
  }
}
