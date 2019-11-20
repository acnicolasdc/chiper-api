class DialogFlowLib {
    constructor(){
        this.breakPoint = {welcome:'Welcome'};
        this.response = {};
    }
    connect(intent, parameters, outputContexts, queryText){
        switch (intent.displayName) {
            case this.breakPoint.welcome:
                return this.welcome();
            default:
                return "is not a action"
        }
    }
    welcome(){
        Object.assign(this.response, {
            fulfillmentText: 'HOLAAAAAA',
            payload: {
                is_image: true,
                url: `https://miro.medium.com/max/5400/1*PIAFi2Zgt-xsddMO2teWvQ.jpeg`
            }
        });
        return this.response;
    }
    addProduct(){

    }
    chargeMoney(){

    }
    chooseCategory(){

    }
    chooseProduct(){

    }
    customizeOrder(){

    }
    finalOrder(){

    }

}

module.exports = DialogFlowLib;