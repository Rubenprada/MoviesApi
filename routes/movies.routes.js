'use strict';


//requerimos express
const express = require('express');
const { restart } = require('nodemon');


//llamamos a el esquema
const Movies = require('../models/Movies.js');

//importamos manejo de errores
const createError = require('../utils/errors/create-errors.js')

//importamos autenticacion
const isAuth = require('../utils/middlewares/auth.middleware.js');

//importamos subida de archivos
const upload = require('../utils/middlewares/file.middleware.js');

//requerimos uri
const imageToUri = require('image-to-uri');

//requerimos fs para leer archivos
const fs = require('fs');


//creamos un ruter para las peliculas
const moviesRoutes = express.Router();


//hacemos un endpoint get y en caso de /  vamos a recibir todas las peliculas
moviesRoutes.get('/', async (req, res, next) => {
    try {
        //recuperamos todas las peliculas de DB
        const movies = await Movies.find();
        return res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
    
});

//hacemos un endpoint /:id para recuperar por su id
moviesRoutes.get('/:id', async (req, res, next) => {
    //el id se encuentra dentro de los parametros de la req, la guardamos en una variable
    const id = req.params.id;
    try {
        const movies = await Movies.findById(id);
        if (movies) {
            return res.status(200).json(movies);
        } else {
            next(createError('No existe la pelicula que estas buscando'));
        }
    } catch (err) {
        next(err)
    }

});

//endpoint para buscar por su titulo
moviesRoutes.get('/title/:title', async (req, res, next) => {
    const title = req.params.title;
    try {
        const movies = await Movies.find({title});
        return res.status(200).json(movies);
    } catch (err) {
        next(err)
    }
});

//endpoint para buscar por genero
moviesRoutes.get('/genre/:genre', async (req, res, next) => {
    const genre = req.params.genre;
    try {
        const movies = await Movies.find({genre: {$in: [genre] }});
        return res.status(200).json(movies);
    } catch (err) {
        next(err)
    }
});
 
//endpoint para peliculas estrenadas a partir de 2010
moviesRoutes.get('/year/:year', async (req, res, next) => {
    const year = req.params.year;
    try {
        const movies = await Movies.find({year: { $gte: 2010 }});
        return res.status(200).json(movies);
    } catch (err) {
        next(err)
    }
});

//endpoint para crear una nueva pelicula y subida de imagenes
moviesRoutes.post('/', [upload.single('picture')], async (req, res, next) => {
    try{
        //cogemos el path(ruta imagen o archivo que viene en la req)
        const filePath = req.file ? req.file.path : null;
        //pasamos la imagen con imageToUri
        const picture = imageToUri(filePath);
        //aplicamos el schema 
        const newMovie = new Movies({ ...req.body, picture });
        //guardamos la nueva pelicula en la DB
        const createdMovie = await newMovie.save();
        //desvinculamos el archivo subido por multer
        await fs.unlinkSync(filePath);
        return res.status(201).json(createdMovie);
    } catch (err) {
        next(err);
    }
});

//endpoint para modificar peliculas
moviesRoutes.put('/:id',[isAuth], async (req, res, next) => {
    try{
        const id = req.params.id;
        const modifiedMovie = new Movies({...req.body});
        modifiedMovie._id = id;
        const moviesUpdate = await Movies.findByIdAndUpdate(
            id,
            { $set: {...modifiedMovie}},
            {new: true}
        );
        return res.status(200).json(moviesUpdate);
    } catch (err) {
        next(err)
    }
});

//endpoint para eliminar peliculas
moviesRoutes.delete('/:id',[isAuth], async (req, res, next) => {
    try {
        const id = req.params.id;
        await Movies.findByIdAndDelete(id);
        return res.status(200).json('La pelicula ha sido eliminada correctamente');
    } catch (err) {
        next(err)
    }
});

//exportamos el modulo
module.exports = moviesRoutes;