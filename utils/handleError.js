const handleHttpError = (res, message = 'FIND_ERROR', code = 403) => // funcion de mi manejador de errores con 3 argumentos
    // una respuesa, un mensaje, y el codigo del error
    {
        res.status(code); //codigo de respuesta
        res.send({ error:message}) //envia el error y un mensaje
    }
module.exports = { handleHttpError } //exporto mi manejador de errores
