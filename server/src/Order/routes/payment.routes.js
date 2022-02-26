
const { Router } = require('express');
const { processPayment, sendStripeApi } = require('../controllers/payment.controllers');
const { authenticate } = require('../../middleware/auth');

const router = Router();

router.post('/process', authenticate , processPayment);

router.get('/stripeapi', authenticate , sendStripeApi);

module.exports = router;