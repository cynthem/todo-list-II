const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'To-doing',
            template: 'src/custom.html'
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new CssMinimizerPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: './src/assets',
                    to: './assets'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
              test: /\.txt$/,
              loader: 'raw-loader',
            },
            {
              test: /.s?css$/,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            }
        ]
    },
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]'
    }
};