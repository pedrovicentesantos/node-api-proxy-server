const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../public')));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  legacyHeaders: false,
  handler: (_, res) => {
    res.status(429).json({
      message: 'Too many requests, please try again later.'
    });
  }
});

app.use(limiter);
app.set('trust proxy', 1);

app.use('/api/v1', require('./routes'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
