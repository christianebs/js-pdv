const knex = require("../conexao");

const cadastrarUsuario = async (req, res) => {
  const { nome, email } = req.body;
  const senhaCriptografada = req.senhaCriptografada;

  try {
    const novoUsuario = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    const [usuarioId] = await knex("usuarios").insert(novoUsuario);

    const usuario = await knex("usuarios").where("id", usuarioId).first();

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    res
      .status(200)
      .json({
        message: "Usuário cadastrado com sucesso",
        usuario: dadosUsuario,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
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
