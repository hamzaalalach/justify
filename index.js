const express = require('express');
const app = express();
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const cors = require('cors');

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(xss());
app.use(logger(':method :url :status :response-time ms :remote-addr'));
app.use(express.text());
app.use(express.json());

app.use('/api', require('./routes/api'));

module.exports = app;
