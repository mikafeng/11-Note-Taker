const express = require('express');
const app = express();

// Import our modular router
const notesRouter = require('.notes')

app.use('/notes', notesRouter);

module.exports = app;