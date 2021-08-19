//建立Express
const express = require('express')
const app = express()
const port = 3000

//建立express-handlebars
const exphbs = require('express-handlebars')

//載入mongoose
const mongoose = require('mongoose')

//引用body-parser
const bodyParser = require('body-parser')

//載入method-override
const methodOverride = require('method-override')

//載入restaurant
const Restaurant = require('./models/restaurant')

//引用路由器
const routes = require('./routes')

//設定連線至mongodb
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

//取得連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


//設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//設定靜態檔案
app.use(express.static('public'))

//設定每筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

//將request導入路由器
app.use(routes)

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordRegex = new RegExp(keyword, 'i')
  Restaurant.find({ $or: [{ category: { $regex: keywordRegex } }, { name: { $regex: keywordRegex } }] })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
