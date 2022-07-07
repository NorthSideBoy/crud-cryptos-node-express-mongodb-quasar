//archivo de la configuración de la conexión de mongoose//
const mongoose = require("mongoose"); //esto es una constante "mongoose" que hace uso de las dependecias de mongoose//

const dbConnect = () => //esto es una función para conectar a la base de datos//
    {
        const DB_URI = process.env.DB_URI; // la constante de la URI de mi base de datos//
        mongoose.connect(DB_URI, // la función de mongoose para conectarse a la base de datos//
            {
                useNewUrlParser: true, //parametro de configuración para mongoose// 
                useUnifiedTopology: true, //otro parametro de configuración para mongoose//
            },
        (err, res) => //error o respuesta de la función//
            {
                if(!err) //función respuesta si NO recibo un error//
                    {
                        console.log("**** CONEXION CORRECTA ****")
                    }
                else //función respuesta SI recibo un error//
                    {
                        console.log("**** ERROR DE CONEXION ****")
                    }
            });
    };

module.exports = dbConnect //modulo para exportar la función dbConnect//