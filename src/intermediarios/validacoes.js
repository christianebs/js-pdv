const knex = require("../conexao");

const validarCamposObrigatoriosUsuario = (req, res, next) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  next();
};

const validarEmailUsuario = async (req, res, next) => {
  const { email } = req.body;
  const usuarioId = req.usuario ? req.usuario.id : null;

  try {
    let query = knex("usuarios").where("email", email);

    if (usuarioId) {
      query = query.whereNot("id", usuarioId);
    }

    const emailExistente = await query.first();

    if (emailExistente) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const validarCamposObrigatoriosProduto = (req, res, next) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  if (quantidade_estoque <= 0 || valor <= 0) {
    return res.status(400).json({
      mensagem:
        "Quantidade em estoque ou valor não podem ser negativos e precisam ser maiores que zero.",
    });
  }

  next();
};

const validarIdProduto = async (req, res, next) => {
  const produto_id = req.params.id;

  if (isNaN(produto_id)) {
    return res.status(400).json({ mensagem: "ID de produto inválido." });
  }

  try {
    const produtoExistente = await knex("produtos")
      .where("id", produto_id)
      .first();

    if (!produtoExistente) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    req.produto = produtoExistente;

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const validarIdCategoria = async (req, res, next) => {
  let categoria_ids = req.body.categoria_id || req.query.categoria_id;

  if (!categoria_ids) {
    return next();
  }

  if (!Array.isArray(categoria_ids)) {
    categoria_ids = [categoria_ids];
  }

  if (categoria_ids.some((id) => isNaN(id))) {
    return res.status(400).json({ mensagem: "ID de categoria inválido." });
  }

  try {
    for (const id of categoria_ids) {
      const categoriaExistente = await knex("categorias").where({ id }).first();
      if (!categoriaExistente) {
        return res.status(404).json({ mensagem: "Categoria não encontrada." });
      }
    }

    req.categoria_ids = categoria_ids;
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  validarCamposObrigatoriosUsuario,
  validarEmailUsuario,
  validarCamposObrigatoriosProduto,
  validarIdProduto,
  validarIdCategoria,
};
