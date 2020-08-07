
const router = require('express').Router();
const { deleteLogo, updateLogo, createLogo, getLogos } = require('../database/logos');

// See all
router.get('/', async (apiRequest, apiResponse) => {
  apiResponse.send(await getLogos());
});
// Make new logo
router.post('/', async (apiRequest, apiResponse) => {
  const newLogo = apiRequest.body;
  await createLogo(newLogo);
  apiResponse.send({
    message: 'New logo formatted.',
    allLogos: await getLogos(),
    thanks: true
  });
});

// Delete logo
router.delete('/:logoId', async (apiRequest, apiResponse) => {
  await deleteLogo(apiRequest.params.productId);
  apiResponse.send({ message: 'Logo deleted.' });
});
// Update logo
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedLogo = apiRequest.body;
  console.log({ updatedProduct })
  await updateLogo(apiRequest.params.id, updatedProduct);
  apiResponse.send({ message: 'Logo updated.' });
});


module.exports = router;
