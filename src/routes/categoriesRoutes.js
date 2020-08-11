const router = require('express').Router();
const { deleteCategory, updateCategory, createCategory, getCategories } = require('../database/categories');


router.get('/', async (apiRequest, apiResponse) => {
    apiResponse.send(await getCategories());
});

router.post('/', async (apiRequest, apiResponse) => {
    const newCategory = apiRequest.body;
    await createCategory(newCategory);
    apiResponse.send({
        message: 'New category created!',
        allCategories: await getCategories()
    });
});

router.delete('/:id', async (apiRequest, apiResponse) => {
    await deleteCategory(apiRequest.params.id);
    apiResponse.send({ message: 'Category removed.' });
});

router.put('/:id', async (apiRequest, apiResponse) => {
    const updatedCategory = apiRequest.body;
    console.log({ updatedCategory })
    await updateCategory(apiRequest.params.id, updatedCategory);
    apiResponse.send({ message: 'Category updated.' });
});

module.exports = router;