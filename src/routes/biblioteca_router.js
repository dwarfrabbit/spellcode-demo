const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {

    res.render('pages/biblioteca/index')
})

router.get('/exerc', async (req, res) => {

    res.render('pages/biblioteca/exerc')
})

module.exports = router