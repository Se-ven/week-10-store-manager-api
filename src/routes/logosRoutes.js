
const router = require('express').Router();
const { deleteLogo, updateLogo, createLogo, getLogos } = require('../database/logos');

// See all
router.get('/', async (req, res) => {
  res.send(await getLogos());
});
// Make new logo
router.post('/', async (req, res) => {
  const newLogo = req.body;
  await createLogo(newLogo);
  res.send({
    message: 'New logo formatted.',
    allLogos: await getLogos(),
    thanks: true
  });
});
// Delete logo
router.delete('/:logoId', async (req, res) => {
  await deleteLogo(req.params.productId);
  res.send({ message: 'Logo deleted.' });
});
// Update logo
router.put('/:id', async (req, res) => {
  const updatedLogo = req.body;
  console.log({ updatedProduct })
  await updateLogo(req.params.id, updatedProduct);
  res.send({ message: 'Logo updated.' });
});


module.exports = router;
