const knex = require("../conexao");
const paginacao = require("../utils/paginacao");
const { validarFormatoEstado } = require("../utils/validarEstadoEmailCpf");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade } = req.body;
  let { estado } = req.body;

  estado = estado.toUpperCase();

  let estadoInvalido = validarFormatoEstado(estado);
  if (estadoInvalido) {
    return res.status(400).json({ mensagem: estadoInvalido });
  }

  try {
    const novoCliente = {
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
    };

    const [clienteId] = await knex("clientes").insert(novoCliente);

    const clienteCadastrado = await knex("clientes")
      .where("id", clienteId)
      .first();

    return res.status(200).json({
      message: "Cliente cadastrado com sucesso",
      cliente: clienteCadastrado,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro interno do servidor", error: error.message });
  }
};

const editarDadosCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade } = req.body;
  const { id } = req.params;
  let { estado } = req.body;

  estado = estado.toUpperCase();

  let estadoInvalido = validarFormatoEstado(estado);
  if (estadoInvalido) {
    return res.status(400).json({ mensagem: estadoInvalido });
  }

  try {
    const dadosAtualizados = {
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
    };

    await knex("clientes").where("id", id).update(dadosAtualizados);

    const clienteAtualizado = await knex("clientes").where("id", id).first();

    return res.status(200).json({
      mensagem: "Cliente atualizado com sucesso",
      cliente: clienteAtualizado,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

const listarClientes = async (req, res) => {
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 10;
  const offset = (pagina - 1) * limite;

  try {
    const clientes = await knex("clientes")
      .orderBy("id", "asc")
      .offset(offset)
      .limit(limite);

    const totalClientes = await knex("clientes").count("* as total").first();
    const respostaPaginacao = paginacao(pagina, limite, totalClientes.total);

    const listaDeClientes = {
      ...respostaPaginacao,
      dados: clientes,
    };

    return res
      .status(200)
      .json({ mensagem: "Lista de Clientes:", clientes: listaDeClientes });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

const detalharCliente = async (req, res) => {
  try {
    return res.status(200).json({ cliente });
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = {
  cadastrarCliente,
  listarClientes,
  detalharCliente,
  editarDadosCliente,
};
