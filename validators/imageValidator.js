const {check} = require("express-validator"); //llamo las dependecias de express validator y las guardo en {check}
const validateResults = require("../utils/handleValidator") //llamo la ruta del resultado del handle de mis validaciones 


const validatorGetImage = 
    [
        check("id") //hace check de la id
        .exists() // que exista
        .notEmpty() // no este vacia
        .isMongoId(), // y que corresponda a una ID de mongo
        (req, res, next) =>
            {
                return validateResults(req, res, next) //me retorna un resultado
            }
    ]

module.exports = { validatorGetImage } //expoto mi validación