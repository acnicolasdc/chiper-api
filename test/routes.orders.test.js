const assert = require('assert');
const proxyquire = require('proxyquire');

const { ordersMock, OrdersServiceMock } = require('../utils/mocks/orders');
const testServer = require('../utils/testServer');

describe('route - orders', function() {
    const route = proxyquire('../routes/orders',{
        '../services/orders': OrdersServiceMock
    });
    const request = testServer(route);
    describe('GET /orders', function() {
        it('Should respond with status 200', function(done) {
            request.get('/api/orders').expect(200, done);
        });
        it('Should respond with orders list', function(done) {
            request.get('/api/orders').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: ordersMock,
                    message: 'orders listed',
                });
                done();
            });
        });
    });
});