const { getDatabase } = require('./mongo-common');
const { ObjectID } = require('mongodb');

let getUserName = require('git-user-name');
const collectionName = 'stores';

// Server side POST
async function createStore(store) {
    const database = await getDatabase();
    store.addedBy = getUserName()

    const { insertedId } = await database.collection(collectionName).insertOne(store);
    return insertedId;
}
// Server side GET
async function getStores() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}
// Server side DELETE
async function deleteStore(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}
// Server side PUT
async function changeStore(id, store) {
    const database = await getDatabase();

    delete store._id;
    store.updatedBy = getUserName()

    await database.collection(collectionName).update(
        { _id: new ObjectID(id), },
        {
            $set: {
                ...store,
            },
        },
    );
}

module.exports = {
    createStore,
    getStores,
    deleteStore,
    changeStore
};