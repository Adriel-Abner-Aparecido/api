const express = require("express");
const cors = require("cors");

const app = express();

//Json
app.use(express.json());

//Resolvendo Cors
app.use(cors({ credentials: true, origin: "https://gteq.onrender.com" }));

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

//Porta de execução
app.listen(3000);
