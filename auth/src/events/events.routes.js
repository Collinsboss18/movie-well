const router = require('express').Router()
const { initiate } = require('./events.controller');

router.post('/', initiate);

module.exports = router;