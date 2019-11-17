const FireBaseLib = require('../lib/fireBase');

class WalletCouponService {
    constructor(){
        this.collection = 'wallet_coupon';
        this.fireStore = new FireBaseLib();
    }
    async getWalletCoupons() {
        const walletCoupon = await this.fireStore.getAll(this.collection);
        return walletCoupon || [];
    }
    async getWalletCoupon({ walletCouponId }) {
        const walletCoupon = await this.fireStore.get(this.collection, walletCouponId);
        return walletCoupon || {};
    }
    async createWalletCoupon({ walletCoupon }) {
        const createdWalletCouponId = await this.fireStore.create(this.collection, walletCoupon);
        return createdWalletCouponId;
    }
    async deleteWalletCoupon({ walletCouponId }) {
        const deletedWalletCouponId = await this.fireStore.delete(this.collection, walletCouponId);
        return deletedWalletCouponId;
    }
    async updateWalletCoupon({ walletCouponId, walletCoupon }) {
        const updatedWalletCouponId = await this.fireStore.update(this.collection, walletCouponId, walletCoupon);
        return updatedWalletCouponId;
    }
}

module.exports = WalletCouponService;