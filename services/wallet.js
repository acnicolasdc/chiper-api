const FireBaseLib = require('../lib/fireBase');

class WalletService {
    constructor(){
        this.collection = 'wallet';
        this.fireStore = new FireBaseLib();
    }
    async getWallets() {
        const wallet = await this.fireStore.getAll(this.collection);
        return wallet || [];
    }
    async getWallet({ walletId }) {
        const wallet = await this.fireStore.get(this.collection, walletId);
        return wallet || {};
    }
    async createWallet({ wallet }) {
        const createdWalletId = await this.fireStore.create(this.collection, wallet);
        return createdWalletId;
    }
    async deleteWallet({ walletId }) {
        const deletedWalletId = await this.fireStore.delete(this.collection, walletId);
        return deletedWalletId;
    }
    async updateWallet({ walletId, wallet }) {
        const updatedWalletId = await this.fireStore.update(this.collection, walletId, wallet);
        return updatedWalletId;
    }
}

module.exports = WalletService;