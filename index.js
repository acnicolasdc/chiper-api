const express = require('express');
const app = express();
const debug = require("debug")("app:server");
const { config } = require('./config/index');
const ordersApi = require('./routes/orders');
const productCategoriesApi = require('./routes/product_categories');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
//Body parser
app.use(express.json());
// Routes
ordersApi(app);
productCategoriesApi(app);
// Catch 404
app.use(notFoundHandler);
//Errors controllers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function(){
    debug(`Listening http://localhost:${config.port}`);
});