const FireBaseLib = require('../lib/fireBase');

class OrderItemsService {
    constructor(){
        this.collection = 'order_items';
        this.fireStore = new FireBaseLib();
    }
    async getOrdersItems() {
        const ordersItems = await this.fireStore.getAll(this.collection);
        return ordersItems || [];
    }
    async getOrderItems({ orderItemsId }) {
        const orderItems = await this.fireStore.get(this.collection, orderItemsId);
        return orderItems || {};
    }
    async createOrderItems({ orderItems }) {
        const createdOrderItemsId = await this.fireStore.create(this.collection, orderItems);
        return createdOrderItemsId;
    }
    async deleteOrderItems({ orderItemsId }) {
        const deletedOrderItemsId = await this.fireStore.delete(this.collection, orderItemsId);
        return deletedOrderItemsId;
    }
    async updateOrderItems({ orderItemsId, orderItems }) {
        const updatedOrderItemsId = await this.fireStore.update(this.collection, orderItemsId, orderItems);
        return updatedOrderItemsId;
    }
}

module.exports = OrderItemsService;