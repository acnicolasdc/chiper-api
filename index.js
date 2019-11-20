const express = require('express');
const app = express();
const debug = require("debug")("app:server");
const { config } = require('./config/index');
const dialogFlowApi = require('./routes/dialogFlow');
const usersApi = require('./routes/users')
const ordersApi = require('./routes/orders');
const ordersItemsApi = require('./routes/order_items');
const orderStatusesApi = require('./routes/order_statuses');
const productsApi = require('./routes/products');
const productAttributeApi = require('./routes/product_attribute');
const productCategoriesApi = require('./routes/product_categories');
const productAttributeCategoryApi = require('./routes/product_attribute_category');
const userWalletCouponApi = require('./routes/user_wallet_coupon');
const walletApi = require('./routes/wallet');
const walletCouponApi = require('./routes/wallet_coupon');
const walletHistoryApi = require('./routes/wallet_history');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
//Body parser
app.use(express.json());
// Routes
dialogFlowApi(app);
// Wallet routes
walletApi(app);
walletCouponApi(app);
walletHistoryApi(app);
//Orders routes
ordersApi(app);
ordersItemsApi(app);
orderStatusesApi(app);
//Products routes
productsApi(app);
productAttributeApi(app);
productCategoriesApi(app);
productAttributeCategoryApi(app);
//User routes
usersApi(app);
userWalletCouponApi(app);
// Catch 404
app.use(notFoundHandler);
//Errors controllers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function(){
    debug(`Listening http://localhost:${config.port}`);
});