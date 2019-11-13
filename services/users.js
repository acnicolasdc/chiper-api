const FireBaseLib = require('../lib/fireBase');

class UsersService {
    constructor(){
        this.collection = 'users';
        this.fireStore = new FireBaseLib();
    }
    async getUsers() {
        const users = await this.fireStore.getAll(this.collection);
        return users || [];
    }
    async getUser({ userId }) {
        const user = await this.fireStore.get(this.collection, userId);
        return user || {};
    }
    async createUser({ user }) {
        const createdUserId = await this.fireStore.create(this.collection, user);
        return createdUserId;
    }
    async deleteUser({ userId }) {
        const deletedUserId = await this.fireStore.delete(this.collection, userId);
        return deletedUserId;
    }
    async updateUser({ userId, user }) {
        const updatedUserId = await this.fireStore.update(this.collection, userId, user);
        return updatedUserId;
    }
}

module.exports = UsersService;