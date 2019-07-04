const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = [{
    entry: {
      main_css: './src/scss/main.scss',
    },
    output: {
      // 全体の設定
      path: path.resolve(__dirname, 'public_html/asset'),
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }
      ],
    },
    plugins:[
      // cssの出力先を指定する
      new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    ],
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
},
{
    entry: {
        bundle: "./src/js/index.tsx",
        //bundle2: "./src/js/admin_menu.tsx",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/public_html/asset/js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
    */
}];