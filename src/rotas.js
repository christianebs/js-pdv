const express = require("express");

const { listarCategorias } = require("./controladores/categorias");
const { cadastrarUsuario, atualizarUsuario, detalharUsuario } = require("./controladores/usuarios");
const { login } = require("./controladores/login");

const { validarCamposObrigatoriosUsuario, validarEmailUsuario } = require("./intermediarios/validacoes");

const { criptografarSenha } = require("./intermediarios/criptografarSenha");
const { validarLogin } = require("./intermediarios/autenticacao");

const rotas = express();

rotas.get("/categoria", listarCategorias);

rotas.post("/usuario", validarCamposObrigatoriosUsuario, criptografarSenha, validarEmailUsuario, cadastrarUsuario);
rotas.post("/login", login);

rotas.use(validarLogin);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarCamposObrigatoriosUsuario, criptografarSenha, validarEmailUsuario, atualizarUsuario);

module.exports = rotas;
