var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = {

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    entry: {
        app: [
            'webpack-hot-middleware/client',
            './src/index.js'
        ],
        vendor: ['immutable', 'react', 'react-dom', 'react-redux', 'redux'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    resolve: {
        extensions: ['', '.js', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    optional: ['runtime'],
                    stage: 0,
                    env: {
                        development: {
                            plugins: [
                                'react-transform'
                            ],
                            extra: {
                                'react-transform': {
                                    transforms: [{
                                        transform: 'react-transform-hmr',
                                        imports: ['react'],
                                        locals: ['module']
                                    }]
                                }
                            }
                        }
                    }
                }
            }]
    },
    postcss: function () {
        return [autoprefixer];
    },
    devtool: 'eval'
}