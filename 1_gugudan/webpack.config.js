const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".jsx", ".js"], // 엔트리 파일의 확장자
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: [" > 1% in KR"], // browserslist 참고해서 문자열 넣기
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })], // 엔트리에 모듈(로더)말고 추가적으로 하고 싶은 작업
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};
