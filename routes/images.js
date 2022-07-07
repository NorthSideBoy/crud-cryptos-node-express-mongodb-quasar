const express = require("express"); //llamo las dependencias de express
const router = express.Router(); //lamo el metodo router de express para manejar mis routas
const { createImage, getImages, getImage, deleteImage, updateImage } = require("../controllers/images");
const uploadFileMiddleware = require("../middlewares/UploadFileMiddleware"); //llamo la ruta de mi middleware
const { validatorGetImage } = require("../validators/imageValidator") //aqui estan mis validaciones
const { validatorFileMimetypeMiddleware } = require("../middlewares/validatorFileMimetypeMiddleware")

router.get("/", getImages)
//propiedad .get de router para obtener las imagenes de mis cryptos

router.get("/:id", validatorGetImage, getImage)
//propiedad .get de router para obtener una imagen de una crypto por id usando una validación

router.delete("/:id", validatorGetImage, deleteImage)
//proiedad .delete de router para eliminar una imagen de una crypto por id usando una validación

router.put("/:id", uploadFileMiddleware.single("myfile"), validatorFileMimetypeMiddleware, validatorGetImage, updateImage)
//propiedad .put de router para actualizar la imagen de una crypto por su id

router.post("/", uploadFileMiddleware.single("myfile"), validatorFileMimetypeMiddleware, createImage)
//propiedad .post de router para insertar una nueva imagen de una nueva crypto usando mi Middleware y el metodo (single) para subir un unico archivo

module.exports = router; //exporto