const BASE_URL_IMAGENS = "#";

const construirUrlImagem = (caminhoImagem) => {
  if (!caminhoImagem) {
    return null;
  }
  return `${BASE_URL_IMAGENS}${caminhoImagem}`;
};

module.exports = construirUrlImagem;
