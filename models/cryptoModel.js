const mongoose = require("mongoose"); //me traigo las dependencias de mongoose

const cryptoScheme = new mongoose.Schema //hago un nuevo esquema de mongoose, que seria el objeto con los valores de mi crypto
    (
        {
            name:
                {
                    type: String //name tipo string
                },
            symbol:
                {
                    type: String //valor tipo Number
                },
            value:
                {
                    type: Number //valor tipo String
                },
            mediaId:
                {
                    type: mongoose.Types.ObjectId
                },
            logotype:
                {
                    type: String
                }
        },
        {
            timestamps:true, //TODO createdAt, updatedAt // fecha de creación y fecha de actualización
            versionKey:false //campo versions de mongoose, sin utilidad para el proyecto pero necesario para la estructura//
        } 
    )

module.exports = mongoose.model("crypto", cryptoScheme) //exporto mi modelo