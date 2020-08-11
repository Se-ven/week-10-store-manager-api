const router = require('express').Router();
const { deleteType, updateType, createProductType, getTypes } = require('../database/product-types');

// Main level types
router.get('/', async (apiRequest, apiResponse) => {
    apiResponse.send(await getTypes());
});
// Create new product type object
router.post('/', async (apiRequest, apiResponse) => {
    const newProductType = apiRequest.body;
    await createProductType(newProductType);
    apiResponse.send({
        message: 'New product type created!',
        allTypes: await getTypes(),
        createdBy: await getUserName()
    });
});
// Delete product type
router.delete('/:id', async (apiRequest, apiResponse) => {
    await deleteType(apiRequest.params.id);
    apiResponse.send({ message: 'Type removed.' });
});
// Update type category
router.put('/:id', async (apiRequest, apiResponse) => {
    const updatedType = apiRequest.body;
    await updateType(apiRequest.params.id, updatedType);
    apiResponse.send({ message: 'Type updated.' });
});

module.exports = router;