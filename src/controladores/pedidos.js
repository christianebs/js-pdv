const knex = require("../conexao");

const cadastrarPedido = async (req, res) => {
  const { observacao, pedido_produtos } = req.body;
  const cliente = req.cliente;

  try {
    const [pedidoId] = await knex("pedidos").insert({
      observacao,
      cliente_id: cliente.id,
    });

    for (const produto of pedido_produtos) {
      await knex("pedido_produtos").insert({
        pedido_id: pedidoId,
        produto_id: produto.id,
        quantidade: produto.quantidade,
      });
    }

    const pedidoCadastrado = await knex("pedidos")
      .where("id", pedidoId)
      .first();

    res.status(200).json({
      message: "Pedido cadastrado com sucesso",
      pedido: pedidoCadastrado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
};

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await knex("pedidos").orderBy("id");
    return res.status(200).json({ pedidos });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = {
  cadastrarPedido,
  listarPedidos,
};
