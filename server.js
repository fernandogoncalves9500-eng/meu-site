const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);

const acessos = [];

app.use((req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress;

  acessos.push({
    ip: ip,
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