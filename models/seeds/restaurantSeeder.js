const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')//載入restaurant model
const RestaurantList = require('../../restaurant.json')//載入restaurant.json
const data = RestaurantList.results
const User = require('../user')

const db = require('../../config/mongoose')

// 新增種子使用者資訊
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantID: [1, 2, 3]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantID: [4, 5, 6]
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  Promise.all(SEED_USER.map(SEED_USERs =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USERs.password, salt))
      .then(hash => User.create({
        name: SEED_USERs.name,
        email: SEED_USERs.email,
        password: hash
      }))
      .then(user => {
        const restaurants = data.filter(restaurant => SEED_USERs.restaurantID.includes(restaurant.id))
        restaurants.forEach(restaurant => {restaurant.userId = user._id})
        return Restaurant.create(restaurants)
      })
  ))
  .then(() => {
    console.log('done')
    process.exit()
  })
  .catch(err => console.log(err))
})