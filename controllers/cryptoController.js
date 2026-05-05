const Crypto = require('../models/Crypto');

// @desc    Fetch all cryptocurrencies
// @route   GET /crypto
// @access  Public
const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    res.json(cryptos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching cryptos' });
  }
};

// @desc    Fetch top gainers
// @route   GET /crypto/gainers
// @access  Public
const getTopGainers = async (req, res) => {
  try {
    // Sort by change24h in descending order (highest first)
    const cryptos = await Crypto.find({}).sort({ change24h: -1 });
    res.json(cryptos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching top gainers' });
  }
};

// @desc    Fetch new listings
// @route   GET /crypto/new
// @access  Public
const getNewListings = async (req, res) => {
  try {
    // Sort by createdAt in descending order (newest first)
    const cryptos = await Crypto.find({}).sort({ createdAt: -1 });
    res.json(cryptos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching new listings' });
  }
};

// @desc    Add a new cryptocurrency
// @route   POST /crypto
// @access  Public (or Private depending on your needs, keeping public for assignment)
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || price === undefined || !image || change24h === undefined) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const cryptoExists = await Crypto.findOne({ symbol: symbol.toUpperCase() });

    if (cryptoExists) {
      return res.status(400).json({ message: 'Cryptocurrency with this symbol already exists' });
    }

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h,
    });

    if (crypto) {
      res.status(201).json({
        message: 'Cryptocurrency added successfully',
        crypto
      });
    } else {
      res.status(400).json({ message: 'Invalid crypto data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error adding crypto' });
  }
};

module.exports = {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto,
};
