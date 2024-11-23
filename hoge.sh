#!/bin/bash

# プロジェクトディレクトリに移動
cd /home/site/wwwroot

# escape-htmlがインストールされているか確認
if ! npm ls escape-html > /dev/null 2>&1; then
    echo "escape-html is not installed. Installing escape-html..."
    # escape-htmlがインストールされていなければインストール
    npm install escape-html
else
    echo "escape-html is already installed."
fi

# アプリケーションを起動
echo "Starting application..."
npm start
