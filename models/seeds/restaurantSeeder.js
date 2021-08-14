const mongoose = require('mongoose')//載入mongoose
const Restaurant = require('../restaurant')//載入restaurant model
const RestaurantList = require('../../restaurant.json')//載入restaurant.json


//設定連線至mongodb
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

//取得連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

//連線成功
//新增餐廳資料
db.once('open', () => {
  console.log('mongodb connected!')
  RestaurantList.results.forEach(restaurant => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
})
