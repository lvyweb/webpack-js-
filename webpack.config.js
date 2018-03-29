// 最终这个配置文件 是由node去解析

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  // 入口文件目录
  entry:{
    plugs:['jquery','bootstrap'],
    common:'./src/assets/js/common/common.js',
    index:'./src/assets/js/index/index.js',
    register:'./src/assets/js/index/register.js'
  },
  output:{  
    // 输出的文件目录
    path: path.join(__dirname, 'dist/resource'),
    filename:'js/[name].bundle.js',
  },
  module:{
   rules:[ 
        // {
        //   test:/\.css$/, 
        //   exclude:path.join(__dirname,'node_module'),
        //   loader:'style-loader!css-loader'
        // },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },

        {
         test: /\.less$/ ,// 匹配当前loader要处理的文件
         // less-loader作用:是读取test规则对应的文件，然后把读取到的less文件内容转换为css内容
        loader:'style-loader!css-loader!less-loader'
       },
        {
        test:/\.js$/,
        // 也需要一些参数，babel不令是能转换es6，还能将react的语法转换成js
        exclude:path.join(__dirname,'node_module'),
        loader:'babel-loader',
       },
      {//处理图片资源,样式
          test:/\.(png|svg|jpg|jpeg|gif)$/,//这里处理了以.png .svg .jpg .jpeg .gif为后缀名的图片
          use:[
              {loader:'file-loader?limit=1024&name=images/[name].[ext]'}//加载器file-loader和npm run build之后 图片的存储文件夹
          ]
      },
      {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,  
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {  
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'  
      }, 
      {  
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  
          loader: 'file-loader'  
     },
     {  
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  
          loader: "url-loader?limit=10000&mimetype=image/svg+xml"  
     },

    ]
   
  },
  
 plugins:[
    new webpack.ProvidePlugin({
    　　$: "jquery",
    　　jQuery: "jquery",
        "window.jQuery": "jquery",
        _:"lodash"//lodash
    }),
    // 要使用webpack自的插件来分离第三方包
    new webpack.optimize.CommonsChunkPlugin(
      {
        // 第一个参数，就是我们在entry写的一个属性名
      // webpack会自动读取对应的值，找到相应的包
      name: 'plugs',
      // 第二个参数，是第三方包单独打包后生成的文件名
      filename: 'js/vender.js'
    }),
    new HtmlWebpackPlugin({//简化了html文件的创建，以便为webpack包提供服务。
        filename:'html/index.html',//处理dirname路径的问题 ，这里等同于'../dist/index.html'
        template:'./src/templates/index.html',
        chunks:['plugs','common','index']//选择加载的css和js,模块名对应上面entry接口的名称
   }),
   new HtmlWebpackPlugin({
       filename:'html/register.html',
       template:'./src/templates/register.html',
       chunks:['plugs','common','register']
   }),
  new ExtractTextPlugin('css/[name].[chunkhash].min.css'),

    
    
    // 这个压缩代码的插件!
    // new webpack.optimize.UglifyJsPlugin({
    // })
  ]

}