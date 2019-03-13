export default {
  singular: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva:true
    }],
  ],
  lessLoaderOptions:{
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'less-loader' // compiles Less to CSS
      }]
    }]
  },
  routes: [{
    path: '/',
    component: './main',
  }],
}