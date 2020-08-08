const router = require('express').Router();
const { deleteStore, updateStore, createStore, getStores } = require('../database/stores')

// Top level view of the page
router.get('/', async (apiRequest, apiResponse) => {
    apiResponse.send(await getStores());
});

// Make a new store entry
router.post('/', async (apiRequest, apiResponse) => {
    const newStore = apiRequest.body;
    await createStore(newStore);
    apiResponse.send({
        message: 'New store entry created!',
        allStores: await getStores()
    });
});

// Delete store entry
router.delete('/:id', async (apiRequest, apiResponse) => {
    await deleteStore(apiRequest.params.storeId);
    apiResponse.send({ message: 'Store entry deleted.' });
});

// Update store entry
router.put('/:id', async (apiRequest, apiResponse) => {
    const updatedStore = apiRequest.body;
    await updateStore(apiRequest.params.id, updatedStore);
    apiResponse.send({ message: 'Store entry updated.' });
});

module.exports = router;