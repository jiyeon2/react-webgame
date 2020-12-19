const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay-setting",
  mode: "development", // 실 서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./client"],
  }, // 입력
  module: {
    rules: [
      {
        test: /\.jsx?/, // js, jsx 파일에 대해
        loader: "babel-loader", // 바벨로더 적용하겠다
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        }, // 바벨 옵션 넣기
      },
    ],
  }, // entry 파일을 읽어와서 모듈을 적용하여 output으로 뺀다
  plugins: [new RefreshWebpackPlugin()],
  output: {
    path: path.join(__dirname, "dist"), // 실제 경로
    filename: "app.js",
    publicPath: "/dist/", //가상경로
  }, // 출력
  devServer: {
    publicPath: "/dist/",
    hot: true,
  },
};
