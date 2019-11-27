const { dialogFlowIntents } = require('../config/index');
const ProductCategoriesService = require('../services/product_categories');
const ProductsService = require('../services/products');
class DialogFlowLib {
    constructor(){
        this.breakPoint = dialogFlowIntents;
        this.response = {};
    }
    async connect(intent, parameters, outputContexts, queryText){
        console.log(intent, parameters, outputContexts, queryText);
        switch (intent.displayName) {
            case this.breakPoint.chooseCategory:
                return await this.chooseCategory(parameters);
            case this.breakPoint.chooseProduct:
                return await this.chooseProduct(parameters);
            default:
                return "is not a action"
        }
    }
    _buildMessage(fulfillmentText, payload){
        Object.assign(this.response, {
            fulfillmentText: fulfillmentText,
            payload: payload
        });
    }
    // async welcome(){
    //     this._buildMessage('TODO PODEROSO BACK ON !!:)', payloadTest);
    //     return this.response;
    // }
    async chooseProduct(parameters){
        const filter = {
            key:'category_id',
            operator:'==',
            value:parameters.category
        }
        const productsService = new ProductsService();
        try{
            const productCategories = await productsService.getProducts(filter);
            this._buildMessage('¡Perfecto! escoge alguna de las categorías para que puedas ver nuestros productos disponibles', {data: productCategories});
            return this.response;
        }catch(err){
            this._buildMessage('Lo siento, al parecer nos paso algo malo, culpen a Arley',{ data:[]});
            return this.response;
        }
    }
    async chooseCategory(parameters){
        const productCategoriesService = new ProductCategoriesService();
        try{
            const productCategories = await productCategoriesService.getCategories({ parameters });
            this._buildMessage('¡Perfecto! escoge alguna de las categorías para que puedas ver nuestros productos disponibles', {data: productCategories});
            return this.response;
        }catch(err){
            this._buildMessage('Lo siento, al parecer nos paso algo malo, culpen a Arley',{ data:[]});
            return this.response;
        }
    }

}

module.exports = DialogFlowLib;