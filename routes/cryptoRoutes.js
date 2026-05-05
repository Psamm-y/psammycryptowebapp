const express = require('express');
const router = express.Router();
const {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
} = require('../controllers/cryptoController');

router.route('/')
  .get(getAllCryptos)
  .post(addCrypto);

router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);

module.exports = router;
