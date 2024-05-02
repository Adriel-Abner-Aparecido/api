const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Json
app.use(express.json());

//Resolvendo Cors
app.use(
  cors({ credentials: true, origin: `${process.env.URL_AUTHORIZATION}` })
);

console.log(process.env.URL_AUTHORIZATION);

//arquivos Publicos
app.use(express.static("public"));

//Rotas
const UserRoutes = require("./routes/userRoutes");
const LoginRoutes = require("./routes/loginRouter");
const ObrasRoutes = require("./routes/obrasRoute");
const NumerosRoutes = require("./routes/numerosRoute");
const ServicosRouter = require("./routes/servicosRoute");
const EntregasRouter = require("./routes/entregasRouter");
const ServicoPrestadoRouter = require("./routes/servicoprestadoRouter");
const EtapasRouter = require("./routes/etapasRouter");
const MetaRouter = require("./routes/metasRouter");
const AvatarRouter = require("./routes/avatarRouter");
const DescontosRouter = require("./routes/descontosRouter");

app.use("/usuarios", UserRoutes);
app.use("/login", LoginRoutes);
app.use("/obras", ObrasRoutes);
app.use("/numerosObra", NumerosRoutes);
app.use("/servicos", ServicosRouter);
app.use("/entregas", EntregasRouter);
app.use("/servicosPrestados", ServicoPrestadoRouter);
app.use("/etapas", EtapasRouter);
app.use("/meta", MetaRouter);
app.use("/avatar", AvatarRouter);
app.use("/descontos", DescontosRouter);

//Porta de execução
app.listen(3000);
