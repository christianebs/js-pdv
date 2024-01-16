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

module.exports = {
  validarCamposObrigatoriosUsuario,
  validarEmailUsuario,
};
