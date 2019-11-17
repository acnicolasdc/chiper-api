const FireBaseLib = require('../lib/fireBase');

class UserWalletCouponService {
    constructor(){
        this.collection = 'user_wallet_coupon';
        this.fireStore = new FireBaseLib();
    }
    async getUserWalletCoupons() {
        const userWalletCoupons = await this.fireStore.getAll(this.collection);
        return userWalletCoupons || [];
    }
    async getUserWalletCoupon({ userWalletCouponId }) {
        const userWalletCoupon = await this.fireStore.get(this.collection, userWalletCouponId);
        return userWalletCoupon || {};
    }
    async createUserWalletCoupon({ userWalletCoupon }) {
        const createdUserWalletCouponId = await this.fireStore.create(this.collection, userWalletCoupon);
        return createdUserWalletCouponId;
    }
    async deleteUserWalletCoupon({ userWalletCouponId }) {
        const deletedUserWalletCouponId = await this.fireStore.delete(this.collection, userWalletCouponId);
        return deletedUserWalletCouponId;
    }
    async updateUserWalletCoupon({ userWalletCouponId, userWalletCoupon }) {
        const updatedUserWalletCouponId = await this.fireStore.update(this.collection, userWalletCouponId, userWalletCoupon);
        return updatedUserWalletCouponId;
    }
}

module.exports = UserWalletCouponService;