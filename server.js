const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const acessos = [];

app.use((req, res, next) => {
  acessos.push({
    ip: req.ip,
    horario: new Date().toISOString(),
    rota: req.originalUrl
  });

  console.log(acessos[acessos.length - 1]);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/admin", (req, res) => {
  res.json(acessos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});