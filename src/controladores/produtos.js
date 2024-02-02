const knex = require("../conexao");
const construirUrlImagem = require("../utils/baseUrl");
const paginacao = require("../utils/paginacao");
const produtoExisteEmPedido = require("../utils/produtoExisteEmPedido");
const { uploadImagem, excluirImagem } = require("../servicos/uploadsImagens");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const novoProduto = {
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    };

    const [produtoId] = await knex("produtos").insert(novoProduto);

    if (req.file) {
      const { originalname, mimetype, buffer } = req.file;
      const imagemProduto = await uploadImagem(
        `produtos/${produtoId}/${originalname}`,
        buffer,
        mimetype
      );

      await knex("produtos")
        .update({
          produto_imagem: imagemProduto.path,
        })
        .where({ id: produtoId });
    }

    const produtoCadastrado = await knex("produtos")
      .where("id", produtoId)
      .first();

    res.status(200).json({
      message: "Produto cadastrado com sucesso",
      produto: produtoCadastrado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
};

const editarDadosProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const imagem = req.file;

  try {
    const { id } = req.params;
    const produto = await knex("produtos").where({ id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    let imagemProdutoPath = produto.produto_imagem;

    if (imagem) {
      const { originalname, mimetype, buffer } = imagem;

      if (produto.produto_imagem) {
        await excluirImagem(produto.produto_imagem);
      }

      const imagemProduto = await uploadImagem(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      );

      imagemProdutoPath = imagemProduto.path;
    }

    await knex("produtos").where({ id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
      produto_imagem: imagemProdutoPath,
    });

    const produtoAtualizado = await knex("produtos").where({ id }).first();

    produtoAtualizado.produto_imagem = produtoAtualizado.produto_imagem
      ? construirUrlImagem(produtoAtualizado.produto_imagem)
      : null;

    res.status(200).json({
      mensagem: "Produto atualizado com sucesso",
      produto: produtoAtualizado,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

const listarProdutos = async (req, res) => {
  const categoriaIds = req.categoria_ids;
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 10;
  const offset = (pagina - 1) * limite;

  try {
    let query = knex("produtos")
      .orderBy("id", "asc")
      .limit(limite)
      .offset(offset);

    if (categoriaIds) {
      query = query.whereIn("categoria_id", categoriaIds);
    }

    const produtos = await query;

    const produtosComUrls = produtos.map((produto) => {
      if (produto.produto_imagem) {
        produto.produto_imagem = construirUrlImagem(produto.produto_imagem);
      }
      return produto;
    });

    const totalProdutosQuery = knex("produtos");
    if (categoriaIds) {
      totalProdutosQuery.whereIn("categoria_id", categoriaIds);
    }
    const totalProdutos = await totalProdutosQuery.count("* as total").first();
    const respostaPaginacao = paginacao(pagina, limite, totalProdutos.total);

    const listaDeProdutos = {
      ...respostaPaginacao,
      dados: produtosComUrls,
    };

    return res
      .status(200)
      .json({ mensagem: "Lista de Produtos:", produtos: listaDeProdutos });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

const detalharProduto = async (req, res) => {
  if (req.produto.produto_imagem) {
    req.produto.produto_imagem = construirUrlImagem(req.produto.produto_imagem);
  }
  return res.status(200).json(req.produto);
};

const deletarProduto = async (req, res) => {
  const produto_id = req.params.id;

  try {
    const produtoEstaVinculadoPedido = await produtoExisteEmPedido(produto_id);

    if (produtoEstaVinculadoPedido) {
      return res.status(400).json({
        mensagem:
          "Não é possível deletar o produto pois ele está vinculado a um pedido.",
      });
    }
    if (
      produtoEstaVinculadoPedido &&
      produtoEstaVinculadoPedido.produto_imagem
    ) {
      await excluirArquivo(produtoEstaVinculadoPedido.produto_imagem);

      await knex("produtos").where({ id: produto_id }).update({
        produto_imagem: null,
      });
    }

    const produtoDeletado = await knex("produtos")
      .where({ id: produto_id })
      .del();

    if (!produtoDeletado) {
      return res
        .status(404)
        .json({ mensagem: "Produto não encontrado ou já foi deletado." });
    }

    return res.status(200).json({ mensagem: "Produto deletado com sucesso." });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarProduto,
  listarProdutos,
  detalharProduto,
  editarDadosProduto,
  deletarProduto,
};
