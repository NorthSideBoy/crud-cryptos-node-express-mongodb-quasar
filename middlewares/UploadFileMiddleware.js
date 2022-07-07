const multer = require("multer"); //dependencia de multer//
const storage = multer.diskStorage //llamo a storage a usar el metodo diskStorage para poder comunicarse con el disco local//
    (   
        {
            destination: function (req, file, cb)   //argumentos de funcion destination (para declarar la ruta donde se van a guardar los archivos), 
            //request, file, y la función final callback(cb)//
                {
                    const pathStorage = `${__dirname}/../images`

                    cb(null, pathStorage);
                    //cb pasa como primer argumento un error, y como segundo argumento un string con la ruta// 
                },
            filename: function (req, file, cb) //esta función es para que los nombres de los archivos subidos sean aleatorios,
            // y no se sobreescriban entre ellos si tienen el mismo nombre antes de subirlos//
                {
                    const ext = file.originalname.split(".").pop() //la constante ext es igual al uso de el parametro de multer "file" para menejar el archivo,
                    //de split("(.)" para que lo corte donde hay un punto, y de .pop() para que tome el ultimo valor despues de el ultimo punto//
                    //que seria la extension del archivo
                    const filename = `file-${Date.now()}.${ext}`
                    //filename seria el nuevo nombre del archivo, simplemente hace uso de un prefijo "file-" y Date.now para que devuelva, 
                    //la marca de tiempo pero en formato unix(unido) y uso de "ext" para que le vuelva a poner la extension
                    cb(null, filename)
                    //callback devuelve un error(nulo) y el filename//
                },
        }
    );

const uploadFileMiddleware = multer({storage}); // declaro mi Middleware para que haga uso de "storage" que fue hice uso de mis funciones destination y filename

module.exports = uploadFileMiddleware //simplemente exporto el middleware de subida