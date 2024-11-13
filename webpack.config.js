const path = require('path');

module.exports = {
    // entry: './src/main.ts',  // エントリーポイントのファイル
    output: {
        // filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "path": require.resolve("path-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "querystring": require.resolve("querystring-es3"),
            "stream": require.resolve("stream-browserify"),
            "vm": require.resolve("vm-browserify"),
            "net": false,  // `net`モジュールを無効化
            "fs": false    // `fs`モジュールを無効化
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    devServer: {
        client: {
            logging: 'none'  // ログ出力を非表示に設定
        }
    }
};
