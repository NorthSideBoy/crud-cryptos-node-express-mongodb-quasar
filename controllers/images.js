const fs = require("fs") //fs me permite manipular los archivos del sistema
const { matchedData } = require('express-validator'); //función matchedData de la librerias de express-validator
const imageModel = require('../models/imageModel'); //me traigo la ruta del modelo de las IMAGENES de mis CRYPTOS
const { handleHttpError } = require('../utils/handleError'); //me traigo la ruta de mi manejador de errores
const PUBLIC_URL = process.env.PUBLIC_URL //me traigo mi url publica con process.env de mi variable de entorno PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../images`// la const MEDIA_PATH va a ser igual a la ruta de la carpeta donde se van a guardar las imagenes

const getImages = async (req, res) => //controlador obtener todas las imagenes
    {
        
        try
            {
                const data = await imageModel.find({}) //la const de data va a ser igual al a busqwueda de los modelos en la base de datos con el metodo find
                res.send({ data }) //respuesta
            }
        catch(e)
            {
                handleHttpError(res, "FATAL_ERROR_GET_IMAGES") // si lo anterior falla se dispara un error
            }
    }

const getImage = async (req, res) =>  //controlador para obtener una imagen por su id
    {
        {
            try
                {
                    const { id } = matchedData(req) // la constante {id} va a ser igual a SOLO a la id del objeto que coincide con el modelo
                    const data = await imageModel.findById(id) // data va a ser igual al resultado de la busqueda de la id del modelo de la petición
                    res.send({ data }) //respueta
                }
            catch(e)
                {
                    handleHttpError(res, "FATAL_ERROR_GET_IMAGES") //si lo anterior falla se dispara este error
                }
        }
    }

const createImage = async (req, res) => 
    {
        try
            {
                const { file } = req //la constante {file} va a ser igual solo al file(nombre) del objeto que coindide con el modelo
                const fileData = //constante con toda la data del objeto {file}
                    {
                        filename: file.filename, //nombre del archivo
                        url: `${PUBLIC_URL}/${file.filename}` //ruta del archivo
                    }
                const data = await imageModel.create(fileData) //metodo para crear la file data a partir de la imagen
                res.send({data})
            }
        catch(e)
            {
                handleHttpError(res, "FATAL_ERROR_CREATE_IMAGE") //si lo anterior falla se dispara un error
            }
    }
const updateImage = async (req, res) => 
    {
        try
        {
            const { id } = matchedData(req) //const {id} es igual al _id del objeto que coincide con el objeto
            const dataFile = await imageModel.findById(id) //busqueda de el modelo por la id
            const {filename} = dataFile //
            const { file } = req //la constante {file} va a ser igual solo al file(nombre) del objeto
            const fileData = //constante con toda la data del objeto {file}
                {
                    filename: file.filename,
                    identificador: id, //nombre del archivo
                    url: `${PUBLIC_URL}/${file.filename}` //ruta del archivo
                }
            dataFile.url = fileData.url // nueva url de la imagen
            dataFile.filename = fileData.filename //nuevo filename de la imagen
            await dataFile.save() // metodo ".save" que guarda los nuevos parametros en el modelo

            const filePath = `${MEDIA_PATH}/${filename}` //eliminación del archivo local
            fs.unlinkSync(filePath)
            res.send({fileData}) //respuesta 
        }
    catch(e)
        {
            handleHttpError(res, "FATAL_ERROR_UPDATE_IMAGE") //si lo anterior falla se dispara un error
        }
    };

const deleteImage = async (req, res) => 
    {
        try
        {
            const { id } = matchedData(req) //const {id} es igual al _id del objeto que coincide con el objeto
            const dataFile = await imageModel.findById(id) //busqueda de el modelo por la id
            await imageModel.deleteOne({id}) // eliminación del objeto por su id
            const {filename} = dataFile
            const filePath = `${MEDIA_PATH}/${filename}`
            fs.unlinkSync(filePath) //metodo de fs para eliminar la imagen FISICA en la ruta donde se encuentre la imagen a eliminar por el "filename"
            const data = //dara personalizada
                {
                    filePath,
                    delete: true
                }
            res.send ({ data }) //respueta de la eliminación de la imagen
        }
    catch(e)
        {
            handleHttpError(res, "FATAL_ERROR_DELETE_IMAGE")

        }
    }

module.exports = { getImages, getImage, createImage, updateImage, deleteImage};