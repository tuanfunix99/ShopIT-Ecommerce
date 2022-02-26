const ProductRoutes = require("./Product/routes/product.routes");
const UserRoutes = require("./User/routes/user.routes");
const OrderRoutes = require("./Order/routes/order.routes");
const PaymentRoutes = require("./Order/routes/payment.routes");

const routes = {
  ProductRoutes,
  UserRoutes,
  OrderRoutes,
  PaymentRoutes
};

module.exports = routes;
