const {check} = require("express-validator"); //llamo las dependencias de express validator
const validateResults = require("../utils/handleValidator") //llamo la ruta del handle del resultado de mis validaciones

const validatorCreateCrypto = 
    [
        check("name") //hace un check del name
        .exists() //que exista
        .notEmpty(), //que no este vacio
        check("value") //check del value
        .exists() //que exista
        .notEmpty(), //que no este vacio
        check("symbol") //hace un check del Symbolo
        .exists() //que no este vacio
        .isLength({min: 1, max:4}) //que tenga un minimo de 1 caracter o un maximo de 3 caracteres
        .notEmpty(),
        check("mediaId")
        .exists()
        .notEmpty()
        .isMongoId(),
        check("logotype")
        .exists()
        .notEmpty(), //que exista
        (req, res, next) =>
            {
                return validateResults(req, res, next) //me retorna un resultado
            }
    ]

const validatorGetCrypto = 
    [
        check("id") //hace check de la id
        .exists() //que exista
        .notEmpty() //no este vacia
        .isMongoId(), //y que corresponda a una ID de mongo
        (req, res, next) =>
            {
                return validateResults(req, res, next) //me retorna un resultado
            }
    ]

module.exports = { validatorCreateCrypto, validatorGetCrypto } //exporto mis validaciones