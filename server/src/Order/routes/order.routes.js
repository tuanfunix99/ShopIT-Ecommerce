
const { Router } = require('express');
const { authenticate } = require('../../middleware/auth');
const { createOrder, getMyOrders, getSingleOrder } = require('../controllers/order.controllers');

const router = Router();

router.post('/', authenticate, createOrder);

router.get('/my-orders', authenticate, getMyOrders);

router.post('/:id', authenticate, getSingleOrder);

module.exports = router;