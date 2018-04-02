// 最终这个配置文件 是由node去解析
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  // 入口文件目录
  entry:{
    app:path.join(__dirname, 'src/assets/js/app.js'),
    plugs:['jquery','bootstrap'],
  },
  output:{  
    // 输出的文件目录
    path: path.join(__dirname, 'dist/resource'),
    filename:'js/[name].bundle.js',
    // publicPath: './dist/resource/',
    publicPath: '/learn/dist/resource/',
    chunkFilename: 'js/[name].chunk.js',
  },
  module:{
   rules:[ 
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
    new webpack.optimize.CommonsChunkPlugin({
     
          name: 'plugs',
          filename: 'js/vender.js'
        // name: 'vendor',
        // minChunks: ({ resource }) => (
        //     resource &&
        //     resource.indexOf('node_modules') >= 0 &&
        //     resource.match(/\.js$/)
        // )
    }),
   
  new ExtractTextPlugin('css/[name].[chunkhash].min.css'),







  ]

}