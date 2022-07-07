const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => 
    {
        try
            {
                validationResult(req).throw() //valida los datos enviados por las peticiones, si no son validos, dispara un crash con .throw
                return next() // si esta todo bien continua al controlador
            }
        catch(e)
            {
                res.status(403)
                res.send({ error: e.array() }) //si falla responde con un error "403"
            }
    }

module.exports = validateResults //exporto el resultado