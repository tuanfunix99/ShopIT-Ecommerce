const Product = require("../models/Product");
const log = require("../../utils/logger");
const { Error } = require("mongoose");
const QueryFeatures = require("../../utils/QueryFeatures");
const { uploadToCloudinary } = require("../../utils/cloudinary");
const { handleValidationError } = require("../../utils/error");

exports.getAllProduct = async (req, res) => {
  try {
    const perPage = 6;
    const api = new QueryFeatures(
      Product.find().sort({ createdAt: -1 }),
      req.query
    )
      .search()
      .filter();
    let products = await api.query;
    const count = products.length;
    api.pagination(perPage);
    products = await api.query.clone();
    res.status(200).send({
      count,
      products: products,
    });
  } catch (error) {
    log.error({ error: error.message }, "Error get all products");
    return res.status(404).send({ error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user",
      "avatar username"
    );
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
  let errors = {};
  try {
    const imagesLinks = [];
    const images = req.body.images;
    req.body.createdBy = req.user._id;
    const product = new Product(req.body);
    for (let i = 0; i < images.length; i++) {
      const result = await uploadToCloudinary(
        images[i],
        "products/" + product._id
      );
      imagesLinks.push({
        url: result.url,
        public_id: result.public_id,
      });
    }
    product.images = [...imagesLinks];
    await product.save();
    // await Product.create(req.body);
    res.status(200).send(true);
  } catch (error) {
    if (error.name === "ValidationError") {
      handleValidationError(error, errors);
    } else {
      errors.system = error.message;
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
    res.status(200).send(true);
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
    res.status(200).send(true);
  } catch (error) {
    log.error({ error: error.message }, "Error delete product");
    return res.status(401).send({ error: error.message });
  }
};

exports.addNewReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const isReview = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (isReview) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push({
        user: req.user._id,
        username: req.user.username,
        rating: rating,
        comment: comment,
      });
      product.numOfReviews += 1;
    }
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).send(true);
  } catch (error) {
    log.error({ error: error.message }, "Error add new review");
    return res.status(401).send({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate(
      "reviews.user",
      "avatar username"
    );
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).send({ reviews: product.reviews });
  } catch (error) {
    log.error({ error: error.message }, "Error get all reviews");
    return res.status(404).send({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { productId } = req.query;
  try {
    const product = await Product.findById(productId);
    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    );
    const numOfReviews = reviews.length;
    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length;
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).send(true);
  } catch (error) {
    log.error({ error: error.message }, "Error delete review");
    return res.status(404).send({ error: error.message });
  }
};
