'use strict';

//requerimos express
const express = require('express');

//requerimos el schema de los cines
const Cinema = require('../models/Cinema.js');
const createError = require('../utils/errors/create-errors');

//importamos autenticacion
const isAuth = require('../utils/middlewares/auth.middleware.js');
//importamos subida de archivos
const upload = require('../utils/middlewares/file.middleware.js');

//requerimos uri
const imageToUri = require('image-to-uri');

//requerimos cloudinary
const uploadToCloudinary = require('../utils/middlewares/cloudinary.middleware.js');

//creamos router para los cines
const cinemaRouter = express.Router();

//endpoint get para cines para obtener todos
cinemaRouter.get('/', async (req, res, next) => {
    try{
        const cinemas = await Cinema.find().populate('movies');
        return res.status(200).json(cinemas);
    } catch (err) {
        next(err)
    }
});

//endpoit post para cines y asi crear cines subir fotos con cloudinary
cinemaRouter.post('/', [upload.single('picture'), uploadToCloudinary], async (req, res, next) => {
    try{
        const newCinema = new Cinema({...req.body, picture: req.file_url});
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (err) {
        next(err)
    }
});

//añadimos un endpoit PUT para meter peliculas en los cines
cinemaRouter.put('/add-movie', [isAuth], async(req, res, next) => {
    try{
        const {cinemaId, moviesId} = req.body;
        if(!cinemaId) {
            return next(createError('Se neesita un id de Cine para añadir la pelicula', 500));
        };
        if(!moviesId) {
            return next(createError('Se neesita un id de Pelicula para añadirla', 500));
        };
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push : {movies : moviesId}},
            {new : true}
        );
        return res.status(200).json(updatedCinema)
    } catch (err) {
        next(err)
    }
});

//exportamos
module.exports = cinemaRouter;