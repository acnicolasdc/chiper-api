const FireBaseLib = require('../lib/fireBase');

class ProductAttributeService {
    constructor(){
        this.collection = 'product_attribute';
        this.fireStore = new FireBaseLib();
    }
    async getProductAttributes() {
        const productAttribute = await this.fireStore.getAll(this.collection);
        return productAttribute || [];
    }
    async getProductAttribute({ productAttributeId }) {
        const productAttribute = await this.fireStore.get(this.collection, productAttributeId);
        return productAttribute || {};
    }
    async createProductAttribute({ productAttribute }) {
        const createdProductAttributeId = await this.fireStore.create(this.collection, productAttribute);
        return createdProductAttributeId;
    }
    async deleteProductAttribute({ productAttributeId }) {
        const deletedProductAttributeId = await this.fireStore.delete(this.collection, productAttributeId);
        return deletedProductAttributeId;
    }
    async updateProductAttribute({ productAttributeId, productAttribute }) {
        const updatedProductAttributeId = await this.fireStore.update(this.collection, productAttributeId, productAttribute);
        return updatedProductAttributeId;
    }
}

module.exports = ProductAttributeService;