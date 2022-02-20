
const { Router } = require('express');
const { authenticate } = require('../../middleware/auth');
const { createOrder } = require('../controllers/order.controllers');

const router = Router();

router.post('/', authenticate, createOrder);

module.exports = router;