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

    res.status(200).json({
      message: "Usuário cadastrado com sucesso",
      usuario: dadosUsuario,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
};

const editarDadosUsuario = async (req, res) => {
  const { nome, email } = req.body;
  const senhaCriptografada = req.senhaCriptografada;

  try {
    const { id } = req.params;

    const dadosAtualizados = {
      nome,
      email,
      senha: senhaCriptografada,
    };

    await knex("usuarios").where("id", id).update(dadosAtualizados);

    const usuarioAtualizado = await knex("usuarios").where("id", id).first();

    res
      .status(200)
      .json({
        mensagem: "Usuário atualizado com sucesso",
        usuario: usuarioAtualizado,
      });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

const detalharUsuario = async (req, res) => {
  try {
    return res.status(200).json({ usuario });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor', error: error.message });
  }
}

module.exports = { cadastrarUsuario, editarDadosUsuario, detalharUsuario };
