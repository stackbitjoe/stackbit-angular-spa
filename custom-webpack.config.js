const webpack = require('webpack');
const path = require('path');

const WatchExternalFilesPlugin = require("./watchExternalFiles");

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        client: {
            webSocketURL: {
                hostname: '0.0.0.0',
                pathname: '/ws',
                protocol: 'ws',
            },
            webSocketTransport: 'ws',
        },
        webSocketServer: 'ws',
    },
    plugins: [
        new WatchExternalFilesPlugin({
            files: ['./content/**'],
        })
    ]
};