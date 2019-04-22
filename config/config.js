import {resolve} from "path";
export default {
  singular: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      echarts:true
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
    routes: [
    	{
	        path: '/',
	        component: './modPage/illustratedHandbook/index.js',
	    },
    	{
	       	path: '/illustratedHandbook',
	        component: './modPage/illustratedHandbook/index.js',
	    },
	    {
	       	path: '/discovery',
	        component: './modPage/discovery.js'
	    },
    ]
  }],
  alias: {
    '@': resolve(__dirname, './src'),
  },
  targets: {
    ie: 11,
  },
}