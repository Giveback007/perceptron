const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: __dirname + '/dist/index.html',
        hot: true,
        port: 9000
    },
    entry: {
        app:"./src/app.ts",
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            { 
                test: /\.ts?$/, 
                use: [{
                    loader: 'ts-loader',
                    options: { transpileOnly: true }
                }],
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader", // translates CSS into CommonJS
                    options: { sourceMaps: true }
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    options: { sourceMaps: true }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Perceptron',
            template: './src/index.html',
            filename: 'index.html',
            favicon: 'src/favicon.png'
        }),
        // For HMR, makes it easier to see which dependencies are being patched
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
