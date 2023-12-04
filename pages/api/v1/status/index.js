import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  response.status(200).json({ chave: "Teste do cursopontodev que é bão" });
}

export default status;
