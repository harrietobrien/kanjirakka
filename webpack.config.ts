import { Configuration } from "webpack";

const config: Configuration = {
  mode: "development",
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.[tj]sx?$/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: { "timers": require.resolve('timers-browserify') }
  }
};

export default config;