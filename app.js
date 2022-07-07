require("dotenv").config(); //llamo mis variables de entorno
const express = require("express"); // llamo las dependencias de express
const cors = require("cors"); //llamo las dependencias de cors
const app = express() //hago que app use las dependencias de express
const dbConnect = require("./config/mongo"); // llamo la ruta con la configuración de la conexion a la base de datos de mongo ATLAS
const port = process.env.PORT || 3000  // hago uso de la variable de entorno PORT con process.env para asignar a la constante port, si no lo logra, port = 3000

app.use(cors()) //hago que app use las dependencias de cors para darme permisos de acceder a los recursos del servidor

app.use(express.json()) //hago que mi app se prepare para recibir un objeto
app.use(express.static("images")) //hago que mi app use los recursos estaticos que salen de mi carpeta "images"

app.use("/view", require("./views/view"));//renderizo el front
app.use("/crypto", require("./routes/cryptos")) //hago uso de la ruta de mis cryptos
app.use("/images", require("./routes/images"))

app.listen (port, () => //pongo el servidor a "escuchar" en el port (puerto)
        {
            console.log("Server on port " + port) //un console.log que me dice en donde arranco mi puerto
        }    
    );

dbConnect(); //ejecuto la función para llamar a la base de datos
