const { matchedData } = require('express-validator'); //me traigo la función marched data de expressvalidator
const cryptoModel = require('../models/cryptoModel'); //me traigo las rutas de mis modelos
const { handleHttpError } = require('../utils/handleError') //me traigo la ruta con mi manejador de errores

const getCryptos = async (req, res) => //controlador para obtener las cryptomonedas
    {
        try
            {
                const data = await cryptoModel.find({}) //data va a ser igual a la busqueda de la buscqueda de los modelos de las cryptos
                res.send({data}) //repuesta de data
            }
        catch(e)
            {
                handleHttpError(res, 'FATAL_ERROR_GET_CRYPTOS') //si lo anterior falla se dispara un error con un mensaje
            }
    }

const getCrypto = async (req, res) => //controlador para obtener una Crypto por la ID //aqui se hace uso de funciones asincronas "async" espera el resultado de "await"
    {
        try
            {
                req = matchedData(req) //la petición va a ser igual SOLO a la data que coincide de la petición con el modelo
                const {id} = req //aqui me traigo el parametro ID de la petición (req) en una constante "id"
                const data = await cryptoModel.findById(id) // data va a ser igual al resultado de la busqueda de la id del modelo de la petición
                res.send({ data }) //me responde
            }
        catch(e)
            {
                handleHttpError(res, "FATAL_ERROR_GET_CRYPTO") //si lo anterior falla, se me dispara un error
            }
    }

const createCrypto = async (req, res) => // controlador para crear una crypto 
    {
        try
            {
                const body = matchedData (req) //el cuerpo (objeto) va a ser igual a la data que COINCIDE de la petición con el modelo
                const data = await cryptoModel.create(body) // la data va a igual al resultado de la creación el nuevo objeto con el metodo .create
                res.send({data}) //me responde
            }
        catch(e)
            {
                handleHttpError (res, "FATAL_ERROR_CREATE_CRYPTO") //si lo anterior falla se dispara un error
            }
    }

const updateCrypto = async (req, res) => //controlador para actualizar una crypto ya existente
    {
        try
            {
                const {id, ...body} = matchedData (req)
                const cryptoData = await cryptoModel.findById(id)
                const dataCrypto =
                    {
                        name: body.name,
                        value: body.value,
                        symbol: body.symbol,
                        mediaId: body.mediaId,
                        logotype: body.logotype
                    }
                cryptoData.name = dataCrypto.name
                cryptoData.value = dataCrypto.value
                cryptoData.symbol = dataCrypto.symbol
                cryptoData.logotype = dataCrypto.logotype
                cryptoData.mediaId = dataCrypto.mediaId
                await cryptoData.save()
                res.send({cryptoData})
            }
        catch(e)
            {
                handleHttpError(res, "FATAL_ERROR_UPDATE_ITEM") //si lo anterior falla se dispara un error
            }
    }
const deleteCrypto = async (req, res) => //controlador para eliminar una crypto
    {
        try
            {
                req = matchedData(req) //la petición va a ser igual a la data del objeto que coincide con el modulo
                const {id} = req //aqui me traigo el parametro id de la petición (req) en una constante req
                const data = await cryptoModel.deleteOne({_id:id}) //aqui hacemos que data sea igual a la eliminación del objeto por su _id:id
                res.send({ data }) //me da una respuesta
            }
        catch(e)
            {
                handleHttpError(res, "FATAL_ERROR_DELETE_CRYPTO") //si lo anterior falla me dispara un error
            }
    }


module.exports = {getCryptos, getCrypto, createCrypto, updateCrypto, deleteCrypto} // exporto mis controladores para las cryptos