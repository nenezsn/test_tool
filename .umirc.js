
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
}
