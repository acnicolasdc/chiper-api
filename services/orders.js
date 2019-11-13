const FireBaseLib = require('../lib/fireBase');

class OrdersService {
    constructor(){
        this.collection = 'orders';
        this.fireStore = new FireBaseLib();
    }
    async getOrders() {
        const orders = await this.fireStore.getAll(this.collection);
        return orders || [];
    }
    async getOrder({ orderId }) {
        const order = await this.fireStore.get(this.collection, orderId);
        return order || {};
    }
    async createOrder({ order }) {
        const createdOrderId = await this.fireStore.create(this.collection, order);
        return createdOrderId;
    }
    async deleteOrder({ orderId }) {
        const deletedOrderId = await this.fireStore.delete(this.collection, orderId);
        return deletedOrderId;
    }
    async updateOrder({ orderId, order }) {
        const updatedOrderId = await this.fireStore.update(this.collection, orderId, order);
        return updatedOrderId;
    }
}

module.exports = OrdersService;