const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const SampleDb = require('./sample-db')

const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const path = require('path')

// データベース接続
mongoose.connect(process.env.DB_URI || config.DB_URI, { // 環境変数を優先
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    if(process.env.NODE_ENV !== 'production') {
        const sampleDb = new SampleDb()
        // sampleDb.initDb()
    }
}).catch((error) => {
    console.error('Database connection error:', error)
})

const app = express()
app.use(bodyParser.json())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)

// 本番環境用設定
if(process.env.NODE_ENV === 'production') {
    // const appPath = path.join( __dirname, '..', 'dist', 'reservation-app1')
    const appPath = path.join( __dirname, '..', 'dist')
    console.log('Static files path:', appPath) // デバッグ用ログ
    app.use(express.static(appPath))
    app.get("*", function(_req, _res) {
        console.log('Serving index.html for all unmatched routes') // デバッグ用ログ
        _res.sendFile(path.resolve(appPath, 'index.html'))
      })

    //app.get('/products', function(req, res) {
    //    res.json({'success': true})
    //})
}

// サーバー設定
const PORT = process.env.PORT || '3001'
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})