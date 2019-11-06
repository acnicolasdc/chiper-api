const assert = require('assert');
const proxyquire = require('proxyquire');

const {getAllStub, FireBaseLibMock} = require('../utils/mocks/fireBaseLib');
const { ordersMock } = require('../utils/mocks/orders');

describe('services - orders', function() {
    const OrdersServices = proxyquire('../services/orders', {
        '../lib/fireBase': FireBaseLibMock
    });
    const ordersService = new OrdersServices();

    describe('When getOrders method is called', async function() {
        it('Should call the getall FireBaseLib method', async function() {
            await ordersService.getOrders({});
            assert.strictEqual(getAllStub.called, true);
        });
        it('Should return an array of movies', async function() {
            const result = await ordersService.getOrders({});
            const expected = ordersMock;
            assert.deepEqual(result, expected);
        });
    });
});