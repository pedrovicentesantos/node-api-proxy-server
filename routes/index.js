const express = require('express');
const needle = require('needle');
const HttpError = require('../exceptions/HttpError');
const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get('/weather', async (req, res) => {
  try {
    const { location, units, language } = req.query;
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      q: location,
      units: units || 'metric',
      lang: language || 'pt_br'
    });

    const response = await needle('get', `${API_BASE_URL}?${params}`);

    if (response.statusCode !== 200) {
      throw new HttpError(response.body.message, response.statusCode);
    }

    const data = response.body;

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({
        message: error.message
      });
    }

    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
