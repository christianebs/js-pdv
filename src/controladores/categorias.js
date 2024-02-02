const knex = require("../conexao");

const listarCategorias = async (req, res) => {
  try {
    const listaDeCategorias = await knex("categorias").orderBy("id", "asc");

    return res.status(200).json({
      mensagem: "Lista de Categorias:",
      categorias: listaDeCategorias,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = {
  listarCategorias,
};
