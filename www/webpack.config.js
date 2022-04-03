const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
config = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    mode: 'development',
    module: {
        rules: [{
                test: /\.html/,
                loader: 'html-loader',
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {
                                        // Options
                                    },
                                ],
                            ],
                        },
                    },
                }, 'sass-loader']
            },
            {
                // Images
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                // Fonts
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: "./src/individual.html",
            filename: "individual.html",
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src'),
            files: 'js/**/*.js',
        })
    ]
};
module.exports = config;