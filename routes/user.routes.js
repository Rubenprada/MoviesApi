'use strict'

//llamamos express
const express = require('express');

//llamamos a passport
const passport = require('passport');

//llamamos a el esquema de usuarios
const User = require('../models/Users.js');

//llamamos el esquema de movies
const Movies = require('../models/Movies.js')

//llamamos a el manejador de errores
const createError = require('../utils/errors/create-errors.js');

const isAunthAdmin = require('../utils//middlewares/adminAuth.middleware.js');
const isAuth = require('../utils/middlewares/auth.middleware.js');

//llamamos a el encriptador
const bcrypt = require('bcrypt');

//router para usuarios
const userRouter = express.Router();

//endpoit de registro
userRouter.post('/register', (req, res, next) => {
    const done = (err, user) => {
        if(err) {
            return next(err)
        }
        //iniciamos sesion con el user creado
        //2 argumentos: 1/usuario, 2/callback(si es correcto o hay error de logeo) 2.1/Error
        req.logIn(
            user,
            (err) => {
                if(err) {
                    return next(err);
                }
                return res.status(201).json(user)
            }
        )
    };
    //autenticamos al usuario: 1/nombre estrategia 2/done
    passport.authenticate('register', done)(req);
});

//endpoint para login
userRouter.post('/login', (req, res, next) => {
    const done = (err, user) => {
        if(err) {
            return next(err);
        }
        req.logIn(
            user,
            (err) => {
                if(err) {
                    return next(err);
                }
                return res.status(200).json(user);
            }
        )
    }
    passport.authenticate('login', done)(req);
});

//endpoint para logout
userRouter.post('/logout', (req, res, next) => {
    //probamos si hay usuario activo
    if(req.user) {
        //deslogeo al usuario
        req.logOut(() => {
            req.session.destroy(() => {
            //limpio la cookie
                res.clearCookie('connect.sid');
                return res.status(200).json('Te has deconectado');
            });
        });
    } else {
        return res.status(304).json('No hay nadie logeado')
    }
});


//endpoint para obtener todos los usuarios
userRouter.get('/', [isAunthAdmin], async (req, res, next) => {
    try {
        const allUsers = await User.find({}, {password: 0}).sort({role: 1}).populate('favoriteMovies');
        if (allUsers.length === 0) {
            return res.status(200).json('No hay usuarios registrados');
        }
        return res.status(200).json(allUsers)
    } catch (error) {
        return next(error)
    }
});

//endpoint para meter añadir peliculas cono favoritas
userRouter.put('/add-favorite-movie', [isAunthAdmin],async (req, res, next) => {
    try {
        const { userId, movieId } = req.body;
        const currentMovie = await Movies.findById(movieId);
        const currentFavoriteCount = currentMovie.favoriteCount;
        const favoriteUpdated = await Movies.findByIdAndUpdate(
            movieId,
            { $set: { favoriteCount: currentFavoriteCount + 1 } },
            { new: true }
        );
        const userUpdated = await User.findByIdAndUpdate(
            userId,
            { $push: { favoriteMovies: currentMovie } },
            { new: true }
        );
        return res.status(201).json(userUpdated);
    } catch (error) {
        return next(error)
    }
});

//endpoint para eliminar peliculas favoritas
userRouter.put('/remove-favorite-movie',  [isAunthAdmin],async (req, res, next) => {
    try {
        const { userId, movieId } = req.body;
        const currentMovie = await Movies.findById(movieId);
        const currentFavoriteCount = currentMovie.favoriteCount;
        const favoriteUpdated = await Movies.findByIdAndUpdate(
            movieId,
            { $set: { favoriteCount: currentFavoriteCount  -1 } },
            { new: true }
        );
        const userUpdated = await User.findByIdAndUpdate(
            userId,
            { $pull: { favoriteMovies: movieId } },
            { new: true }
        );
        return res.status(201).json(userUpdated);
    } catch (error) {
        return next(error)
    }
});

//exportamos
module.exports = userRouter;