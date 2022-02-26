const Order = require("../models/Order");
const Product = require("../../Product/models/Product");
const log = require("../../utils/logger");
const { handleValidationError } = require("../../utils/error");

exports.createOrder = async (req, res) => {
  let errors = {};
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
    });
    res.status(200).send(true);
  } catch (error) {
    if (error.name === "ValidationError") {
      errors = handleValidationError(error, errors);
    } else {
      errors.system = "Error System";
    }
    log.error({ error: errors }, "error create order");
    res.status(400).send({ error: errors });
  }
};

exports.getSingleOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("user", "username email");
    if (!order) {
      throw new Error("Order not found");
    }
    res.status(200).send(order);
  } catch (error) {
    log.error({ error: error.message }, "error get single order");
    res.status(400).send({ error: error.message });
  }
};

exports.getMyorders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "user",
      "username email"
    );
    res.status(200).send(orders);
  } catch (error) {
    log.error({ error: error.message }, "error get my orders");
    res.status(400).send({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  let totalAmount = 0;
  try {
    const orders = await Order.find().populate("user", "username email");
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).send({ totalAmount, orders });
  } catch (error) {
    log.error({ error: error.message }, "error get my orders");
    res.status(400).send({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(200).send(true);
  } catch (error) {
    log.error({ error: error.message }, "error get my orders");
    res.status(400).send({ error: error.message });
  }
};

const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (product.stock - quantity > 0) {
    product.stock = product.stock - quantity;
  }
  await product.save({ validateBeforeSave: false });
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    await order.remove();
    res.status(200).send(true);
  } catch (error) {
    log.error({ error: error.message }, "error delete order");
    res.status(400).send({ error: error.message });
  }
};
