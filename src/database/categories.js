const { getDatabase } = require('./mongo-common');
const { ObjectID } = require('mongodb');

const collectionName = 'categories';
const getUserName = require('git-user-name');


async function createCategory(category) {
    const database = await getDatabase();
    category.addedBy = getUserName()
    const { insertedId } = await database.collection(collectionName).insertOne(category);
    return insertedId;
}

async function getCategories() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function deleteCategory(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function updateCategory(id, category) {
    const database = await getDatabase();

    delete category._id;
    await database.collection(collectionName).update(
        { _id: new ObjectID(id), },
        {
            $set: {
                ...category,
            },
        },
    );
}

module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
};