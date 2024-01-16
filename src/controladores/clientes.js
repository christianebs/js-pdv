const knex = require("../conexao");

const cadastrarCliente = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const listarClientes = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharCliente = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const editarDadosCliente = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarCliente,
  listarClientes,
  detalharCliente,
  editarDadosCliente,
};
