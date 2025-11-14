// Aqui se encarga de iniciar el servido
const app = require("./src/app");

//Defino el puerto
const PORT = process.env.PORT || 3000;

//Levanto el servidor en el puerto del .env
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
