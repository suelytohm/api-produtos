const { getUsuarios, createUsuario, deleteUsuario } = require('../models/usuariosModel');


deleteProduto


exports.getProdutos = async (req, res) => {
  try {
    const produtos = await getProdutos();
    res.status(200).json(produtos);    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao listar produtos: ' + error });
  }
}

exports.getProdutosById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await getProdutosById(id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao buscar Produto' });
  }
}


exports.createProduto = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  try {
    const produto = await createProduto(nome, email, senha);
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao inserir usuário' });
  }
}

exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await deleteUsuario(id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao remover usuário' });
  }
}

exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  if (!nome && !email && !senha) {
    return res.status(400).json({ error: 'Nenhum dado foi alterado' });
  }
  try {
    const produto = await updateProduto(id, nome, email, senha);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha ao atualizar produto' });
  }
}

