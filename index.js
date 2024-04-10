const express = require("express");
const app = express();
const cors = require("cors");
const { sql } = require("./app");

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/getCards", async (req, res) => {
  try {
    const result = await sql`SELECT * FROM consulta`;
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno no servidor");
  }
});

app.post("/register", async (req, res) => {
  const { name, dataform, horario, tipoconsul } = req.body;

  try {
    await sql`
      INSERT INTO consulta (nome, dataform, horario, tipoconsul)
      VALUES (${name}, ${dataform}, ${horario}, ${tipoconsul})
    `;
    res.status(200).send("Consulta cadastrada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno no servidor");
  }
});

app.put("/edit", async (req, res) => {
  const { name, dataform, horario, tipoconsul, id_consulta } = req.body;

  try {
    await sql`
      UPDATE consulta
      SET nome = ${name}, dataform = ${dataform}, horario = ${horario}, tipoconsul = ${tipoconsul}
      WHERE id_consulta = ${id_consulta}
    `;
    res.status(200).send("Consulta atualizada com sucesso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno no servidor");
  }
});

app.delete("/delete/:id_consulta", async (req, res) => {
  const { id_consulta } = req.params;

  try {
    await sql`DELETE FROM consulta WHERE id_consulta = ${id_consulta}`;
    res.status(204).send("Card deletado com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor na deleção do card");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
