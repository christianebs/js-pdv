const express = require("express");
const multer = require("./intermediarios/multer");
const { login } = require("./controladores/login");
const { cadastrarCategoria, listarCategorias } = require("./controladores/categorias");
const { cadastrarUsuario, editarDadosUsuario, detalharUsuario } = require("./controladores/usuarios");
const { cadastrarProduto, editarDadosProduto, detalharProduto, deletarProduto, listarProdutos } = require("./controladores/produtos");
const { criptografarSenha } = require("./intermediarios/criptografarSenha");
const { validarLogin } = require("./intermediarios/autenticacao");
const {
  validarCamposObrigatoriosUsuario,
  validarEmailUsuario,
  validarCamposObrigatoriosProduto,
  validarIdProduto,
  validarIdCategoria,
} = require("./intermediarios/validacoes");

const rotas = express();

rotas.get("/categoria", listarCategorias);
rotas.post("/categoria", cadastrarCategoria);

rotas.post("/usuario", validarCamposObrigatoriosUsuario, criptografarSenha, validarEmailUsuario, cadastrarUsuario);
rotas.post("/login", login);

rotas.use(validarLogin);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarCamposObrigatoriosUsuario, criptografarSenha, validarEmailUsuario, editarDadosUsuario);

rotas.post("/produto", multer.single("produto_imagem"), validarCamposObrigatoriosProduto, validarIdCategoria, cadastrarProduto );
rotas.put("/produto/:id", multer.single("produto_imagem"), validarCamposObrigatoriosProduto, validarIdProduto, validarIdCategoria, editarDadosProduto);
rotas.get("/produto", validarIdCategoria, listarProdutos);
rotas.get("/produto/:id", validarIdProduto, detalharProduto);
rotas.delete("/produto/:id",validarIdProduto, deletarProduto);

module.exports = rotas;