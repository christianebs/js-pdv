const knex = require("../conexao");

const cadastrarUsuario = async (req, res) => {
  const { nome, email } = req.body;
  const senhaCriptografada = req.senhaCriptografada;

  try {
    const usuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning("*");

    if (!usuario[0]) {
      return res.status(400).json({ mensagem: "Usuário não cadastrado." });
    }

    const { senha: senhaUsuario, ...novoUsuario } = usuario[0];

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso:",
      Usuario: novoUsuario,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email } = req.body;
  const senhaCriptografada = req.senhaCriptografada;

  try {
    const usuario = await knex("usuarios")
      .where({ id: req.usuario.id })
      .update({
        nome,
        email,
        senha: senhaCriptografada,
      });

    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não atualizado." });
    }

    const usuarioAtualizado = await knex("usuarios")
      .where({ id: req.usuario.id })
      .first()
      .select("id", "nome", "email");

    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso:",
      Usuario: usuarioAtualizado,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharUsuario = async (req, res) => {
  try {
    const { senha, ...usuarioDetalhado } = usuario;

    return res
      .status(200)
      .json({ mensagem: "Informações do usuário:", Usuario: usuarioDetalhado });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = { cadastrarUsuario, atualizarUsuario, detalharUsuario };
