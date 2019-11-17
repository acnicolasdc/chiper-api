const FireBaseLib = require('../lib/fireBase');

class OrderStatusesService {
    constructor(){
        this.collection = 'order_statuses';
        this.fireStore = new FireBaseLib();
    }
    async getOrdersStatuses() {
        const ordersStatuses = await this.fireStore.getAll(this.collection);
        return ordersStatuses || [];
    }
    async getOrderStatuses({ orderStatusesId }) {
        const orderStatuses = await this.fireStore.get(this.collection, orderStatusesId);
        return orderStatuses || {};
    }
    async createOrderStatuses({ orderStatuses }) {
        const createdOrderStatusesId = await this.fireStore.create(this.collection, orderStatuses);
        return createdOrderStatusesId;
    }
    async deleteOrderStatuses({ orderStatusesId }) {
        const deletedOrderStatusesId = await this.fireStore.delete(this.collection, orderStatusesId);
        return deletedOrderStatusesId;
    }
    async updateOrderStatuses({ orderStatusesId, orderStatuses }) {
        const updatedOrderStatusesId = await this.fireStore.update(this.collection, orderStatusesId, orderStatuses);
        return updatedOrderStatusesId;
    }
}

module.exports = OrderStatusesService;