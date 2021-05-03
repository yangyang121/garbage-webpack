const { override, fixBabelImports, addLessLoader } = require("customize-cra")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const addAnalyzer = () => (config) => {
  if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  return config
}
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
  }),
  addAnalyzer(),
)
