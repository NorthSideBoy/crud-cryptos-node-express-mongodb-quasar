const { handleHttpError } = require('../utils/handleError');

const validatorFileMimetypeMiddleware = (req, res, next) =>

    {
        const mimetype = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'] //defino un arreglo de mimetypes
        console.log(req.file)
        if (mimetype.find(mime => req.file.mimetype === mime)) //valido si el mimetype del imagen esta dentro del arreglo
            {
                next() //si esta todo bien continua al validador de la ID
            }
        else
            {
                handleHttpError(res, "INVALID_FILE_EXTENSION_ONLY_JPG,_PNG,_JPEG,_SVG_FILES") //si la extension es incorrecta se ejecuta este error 
            }
}
module.exports = { validatorFileMimetypeMiddleware } //expoto mi validación