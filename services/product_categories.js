const FireBaseLib = require('../lib/fireBase');

class ProductCategoriesService {
    constructor(){
        this.collection = 'product_categories';
        this.fireStore = new FireBaseLib();
    }
    async getCategories() {
        const productCategories = await this.fireStore.getAll(this.collection);
        return productCategories || [];
    }
    async getCategory({ productCategoriesId }) {
        const productCategory = await this.fireStore.get(this.collection, productCategoriesId);
        return productCategory || {};
    }
    async createCategory({ productCategory }) {
        const createdProductCategoriesId = await this.fireStore.create(this.collection, productCategory);
        return createdProductCategoriesId;
    }
    async deleteCategory({ productCategoriesId }) {
        const deletedProductCategoriesId = await this.fireStore.delete(this.collection, productCategoriesId);
        return deletedProductCategoriesId;
    }
    async updateCategory({ productCategoriesId, productCategory }) {
        const updatedProductCategoriesId = await this.fireStore.update(this.collection, productCategoriesId, productCategory);
        return updatedProductCategoriesId;
    }
}

module.exports = ProductCategoriesService;