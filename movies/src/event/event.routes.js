const router = require('express').Router()
const { initiate } = require('./event.controller');

router.post('/', initiate);

module.exports = router;