const { getDatabase } = require('./mongo-common');
const { ObjectID } = require('mongodb');

const collectionName = 'product-types';
const getUserName = require('git-user-name');

async function createProductType(type) {
    const database = await getDatabase();
    type.addedBy = getUserName()

    const { insertedId } = await database.collection(collectionName).insertOne(type);
    return insertedId;
}

async function getTypes() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function deleteType(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function updateType(id, type) {
    const database = await getDatabase();

    delete type._id;

    await database.collection(collectionName).update(
        { _id: new ObjectID(id), },
        {
            $set: {
                ...type,
            },
        },
    );
}

module.exports = {
    createProductType,
    getTypes,
    deleteType,
    updateType
};