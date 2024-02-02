const knex = require("../conexao");
const paginacao = require("../utils/paginacao");

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
  const clienteId = req.cliente ? req.cliente.id : null;
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 10;
  const offset = (pagina - 1) * limite;

  try {
    let query = knex("pedidos")
      .orderBy("id", "asc")
      .offset(offset)
      .limit(limite);

    if (clienteId) {
      query.where({ cliente_id: clienteId });
    }

    const pedidos = await query;

    for (const pedido of pedidos) {
      const pedidoProdutos = await knex("pedido_produtos").where({
        pedido_id: pedido.id,
      });

      pedido.pedido_produtos = pedidoProdutos;
    }

    const totalQuery = knex("pedidos").count("* as total");
    if (clienteId) {
      totalQuery.where({ cliente_id: clienteId });
    }

    const totalPedidos = await totalQuery.first();
    const respostaPaginacao = paginacao(pagina, limite, totalPedidos.total);

    const listaDePedidos = {
      ...respostaPaginacao,
      dados: pedidos,
    };

    return res.status(200).json({
      mensagem: "Lista de Pedidos:",
      pedidos: listaDePedidos,
    });
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
