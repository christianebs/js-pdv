const knex = require("../conexao");

const cadastrarProduto = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const listarProdutos = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharProduto = async (req, res) => {
  return res.status(200).json(req.produto);
};

const editarDadosProduto = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const deletarProduto = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarProduto,
  listarProdutos,
  detalharProduto,
  editarDadosProduto,
  deletarProduto,
};
