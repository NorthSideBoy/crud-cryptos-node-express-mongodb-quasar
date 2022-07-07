const mongoose = require("mongoose"); //constante para traerme las dependencias de mongoose//

const StorageScheme = new mongoose.Schema //hago una nuevo esquema mongoose de la imagen de mi CRYPTO
    (
        { 
            url:
                {
                    type:String //la url donde se guarda la imagen en mi computadora
                },
            filename:
                {
                    type:String //y el nombre del archivo
                },
        },
        {
            timestamps:true, //TODO createdAt, updatedAt // fecha de creación y fecha de actualización
            versionKey:false //campo versions de mongoose, sin utilidad para el proyecto pero necesario para la estructura//
        } 
    );

module.exports = mongoose.model("images", StorageScheme) //exporto