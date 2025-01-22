const express = require('express');
const { getProdutos, getProdutosById, createProduto, updateProduto, deleteProduto } = require('../controllers/produtosController');

const router = express.Router();

router.get('/', getProdutos);

router.get('/:id', getProdutosById);

router.post('/', createProduto);

router.put('/:id', updateProduto);

router.delete('/:id', deleteProduto);

module.exports = router;