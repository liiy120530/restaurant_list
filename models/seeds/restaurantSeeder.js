const Restaurant = require('../restaurant')//載入restaurant model
const RestaurantList = require('../../restaurant.json')//載入restaurant.json

const db = require('../../config/mongoose')

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
