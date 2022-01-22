const Product = require("./model/Product");
const log = require("../logger");
const { Error } = require("mongoose");

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    log.error({ error: error.message }, "Error get all products");
    return res.status(404).send({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).send(product);
  } catch (error) {
    log.error({ error: error.message }, "Error get product");
    return res.status(404).send({ error: error.message });
  }
};

exports.createAll = async (req, res) => {
  await Product.insertMany(req.body);
  res.status(200).send("success");
};

exports.createNewProduct = async (req, res) => {
  const errors = {};
  try {
    await Product.create(req.body);
    res.status(201).send(true);
  } catch (error) {
    if (error.name === "ValidationError") {
      for (let property in error.errors) {
        errors[property] = error.errors[property].message;
      }
    }
    log.error({ error: errors }, "Error create new product");
    return res.status(401).send({ error: errors });
  }
};

exports.updateProduct = async (req, res) => {
  const errors = {};
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).send(true);
  } catch (error) {
    if (error.name === "ValidationError") {
      for (let property in error.errors) {
        errors[property] = error.errors[property].message;
      }
    }
    log.error({ error: errors }, "Error update product");
    return res.status(401).send({ error: errors });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(201).send(true);
  } catch (error) {
    log.error({ error: error.message }, "Error delete product");
    return res.status(401).send({ error: error.message });
  }
};
