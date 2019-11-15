const FireBaseLib = require('../lib/fireBase');

class ProductsService {
    constructor(){
        this.collection = 'products';
        this.fireStore = new FireBaseLib();
    }
    async getProducts() {
        const products = await this.fireStore.getAll(this.collection);
        return products || [];
    }
    async getProduct({ productId }) {
        const product = await this.fireStore.get(this.collection, productId);
        return product || {};
    }
    async createProduct({ product }) {
        const createdProductId = await this.fireStore.create(this.collection, product);
        return createdProductId;
    }
    async deleteProduct({ productId }) {
        const deletedProductId = await this.fireStore.delete(this.collection, productId);
        return deletedProductId;
    }
    async updateProduct({ productId, order }) {
        const updatedProductId = await this.fireStore.update(this.collection, productId, order);
        return updatedProductId;
    }
}

module.exports = ProductsService;