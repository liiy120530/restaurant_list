const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordRegex = new RegExp(keyword, 'i')
  Restaurant.find({ userId })
    .find({ $or: [{ category: { $regex: keywordRegex } }, { name: { $regex: keywordRegex } }] })
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants, keyword })
    })
    .catch(error => console.log(error))
})


module.exports = router