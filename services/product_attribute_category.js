const FireBaseLib = require('../lib/fireBase');

class ProductAttributeCategoryService {
    constructor(){
        this.collection = 'product_attribute_category';
        this.fireStore = new FireBaseLib();
    }
    async getProductAttributeCategories() {
        const productAttributeCategory = await this.fireStore.getAll(this.collection);
        return productAttributeCategory || [];
    }
    async getProductAttributeCategory({ productAttributeCategoryId }) {
        const productAttributeCategory = await this.fireStore.get(this.collection, productAttributeCategoryId);
        return productAttributeCategory || {};
    }
    async createProductAttributeCategory({ productAttributeCategory }) {
        const createdProductAttributeCategoryId = await this.fireStore.create(this.collection, productAttributeCategory);
        return createdProductAttributeCategoryId;
    }
    async deleteProductAttributeCategory({ productAttributeCategoryId }) {
        const deletedProductAttributeCategoryId = await this.fireStore.delete(this.collection, productAttributeCategoryId);
        return deletedProductAttributeCategoryId;
    }
    async updateProductAttributeCategory({ productAttributeCategoryId, productAttributeCategory }) {
        const updatedProductAttributeCategoryId = await this.fireStore.update(this.collection, productAttributeCategoryId, productAttributeCategory);
        return updatedProductAttributeCategoryId;
    }
}

module.exports = ProductAttributeCategoryService;