const FireBaseLib = require('../lib/fireBase');

class WalletHistoryService {
    constructor(){
        this.collection = 'wallet_history';
        this.fireStore = new FireBaseLib();
    }
    async getWalletHistories() {
        const walletHistory = await this.fireStore.getAll(this.collection);
        return walletHistory || [];
    }
    async getWalletHistory({ walletHistoryId }) {
        const walletHistory = await this.fireStore.get(this.collection, walletHistoryId);
        return walletHistory || {};
    }
    async createWalletHistory({ walletHistory }) {
        const createdWalletHistoryId = await this.fireStore.create(this.collection, walletHistory);
        return createdWalletHistoryId;
    }
    async deleteWalletHistory({ walletHistoryId }) {
        const deletedWalletHistoryId = await this.fireStore.delete(this.collection, walletHistoryId);
        return deletedWalletHistoryId;
    }
    async updateWalletHistory({ walletHistoryId, walletHistory }) {
        const updatedWalletHistoryId = await this.fireStore.update(this.collection, walletHistoryId, walletHistory);
        return updatedWalletHistoryId;
    }
}

module.exports = WalletHistoryService;