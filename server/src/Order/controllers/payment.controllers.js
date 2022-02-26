require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRECT_KEY);
const log = require("../../utils/logger");

exports.processPayment = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    log.error({ error: error.message }, "Error payment process");
    res.status(400).send({ error: error.message });
  }
};

exports.sendStripeApi = (req, res) => {
  res.status(200).send({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
};
