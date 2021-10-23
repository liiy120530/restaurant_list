const express = require('express')
const router = express.Router()

// 引用Restaurant模組
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId})
    .lean()
    .sort({ _id: 'asc'})
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router