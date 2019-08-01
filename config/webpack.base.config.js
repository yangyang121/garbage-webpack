const path = require("path")

const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: ["./src/index.js"],
  output: {
    // 输出目录
    path: path.join(__dirname, "../dist")
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../src")
      // pages: path.resolve(__dirname, "../src/pages"),
    }
  },
  module: {
    rules: [
      {
        // cnpm i babel-loader @babel/core @babel/preset-env -D
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          "style-loader",
          "css-loader", // 编译css
          "sass-loader" // 编译scss
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "images/", // 图片输出的路径
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: "fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html", // 最终创建的文件名
      template: path.resolve(__dirname, "..", "src/template.html"), // 指定模板路径
      minify: {
        collapseWhitespace: true // 去除空白
      }
    })
  ],
  performance: false // 关闭性能提示
}
