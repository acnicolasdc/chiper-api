const sinon = require('sinon');
const { ordersMock, filteredOrdersMock } = require('./orders');

const getAllStub = sinon.stub();
getAllStub.withArgs('orders').resolves(ordersMock);

const tagQuery = ('date','==','05/26/2018');
getAllStub.withArgs('orders', tagQuery).resolves(filteredOrdersMock('05/26/2018'));

const createStub = sinon.stub().resolves(ordersMock[0].id);

class FireBaseLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }
    create(collection, data) {
        return createStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    FireBaseLibMock
};