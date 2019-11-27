const admin = require("firebase-admin");
const { config } = require('../config');
const debug = require("debug")("app:db");
const serviceAccount = config.googleApplicationCredentials;
const databaseURL = config.dbUrl;

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL,
});

class FireBaseLib {
    constructor(){
        this.client = app;
    }
    connect(){
        if (!FireBaseLib.connection){
            FireBaseLib.connection = new Promise((resolve, reject) => {
                if(!this.client) {
                    debug('We have a problem with the connection, please check your env');
                    reject('Error')
                }
                debug('Connected succesfully to FireBase');
                resolve(this.client.firestore());
            });
        }
        return FireBaseLib.connection;
    }
    getAll(collection, filter = null) {
        return this.connect().then(db =>{
            if(filter){
                return db.collection(collection).where(filter.key, filter.operator, filter.value).get().then(snapshot => {
                    if(snapshot.empty)return;
                    const data = [];
                    snapshot.forEach(doc => {
                        data.push({...doc.data(), docId: doc.id});
                    });
                    return data;
                })
            }else{
                return db.collection(collection).get().then(snapshot => {
                    if(snapshot.empty)return;
                    const data = [];
                    snapshot.forEach(doc => {
                        data.push({...doc.data(), docId: doc.id});
                    });
                    return data;
                })
            }
        });
    }
    get(collection, id) {
        return this.connect().then(db =>{
            return db.collection(collection).doc(id).get().then(doc => {
                if(!doc.exists)return;
                return {...doc.data(), docId: doc.id};
            })
        });
    }
    create(collection, data) {
        return this.connect().then(db =>{
            return db.collection(collection).add(data).then(doc => {
                return doc.id;
            });
        });
    }
    update(collection, id, data){
        return this.connect().then(db =>{
            return db.collection(collection).doc(id).update(data).then(doc => {
                return doc.id || id;
            });
        });
    }
    delete(collection, id){
        return this.connect().then(db =>{
            return db.collection(collection).doc(id).delete().then((doc) => {
                return doc.id || id;
            });
        });
    }
}

module.exports = FireBaseLib;