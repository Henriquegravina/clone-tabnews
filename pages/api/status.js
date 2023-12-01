function status(request, response) {
  response.status(200).json({ chave: "Teste do cursopontodev que é bão" });
}

export default status;
