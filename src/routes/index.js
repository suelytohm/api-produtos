const express = require('express');
const usuariosRoutes = require('./produtos');

const router = express.Router();

router.use('/usuarios', usuariosRoutes);

module.exports = router;