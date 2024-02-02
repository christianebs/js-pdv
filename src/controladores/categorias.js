const knex = require("../conexao");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex("categorias").orderBy("id");
    return res.status(200).json({ categorias });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = {
  listarCategorias,
};
