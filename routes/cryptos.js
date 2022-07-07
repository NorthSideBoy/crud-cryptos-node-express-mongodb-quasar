const express = require("express"); //llamo a express para que mi ruta haga uso de las dependencias de express//
const router = express.Router(); //llamo el metodo Router de express para manejar las rutas de mi app
const { validatorCreateCrypto, validatorGetCrypto } = require("../validators/cryptoValidator") //llamo a todas mis validaciones para las Cryptos
const { getCryptos, getCrypto, createCrypto, updateCrypto, deleteCrypto } = require("../controllers/cryptos") // llamo a todos mis controladores

//propiedad .get de router para obtener todo mi listado de crypto monedas en la ruta
router.get("/", getCryptos)

//propiedad .get de router para obtener un detalle del listado (una crypto de todas las cryptos) filtrando por la id usando una validación
router.get("/:id", validatorGetCrypto, getCrypto)

//propiedad. post para enviar un nuevo objeto(crypto) correspondiente a mi modelo usando una validación
router.post("/", validatorCreateCrypto, createCrypto)

//propiedad .put que me permite actualizar un objeto(crypto) con uno nuevo correspondiente a mi modelo usando una validación y filtrando por id usando una validación
router.put("/:id", validatorCreateCrypto, validatorGetCrypto, updateCrypto)

//propiedad .delete que me permite eliminar una crypto filtrando por id usando una validación
router.delete("/:id", validatorGetCrypto, deleteCrypto)

module.exports = router //exporto mis rutas