// 'use strict'

// //llamamos express
// const express = require('express');

// //llamamos a passport
// const passport = require('passport');

// //llamamos a el esquema de usuarios
// const Admin = require('../models/Admin.js')

// //llamamos a el manejador de errores
// const createError = require('../utils/errors/create-errors.js');

// //llamamos a el encriptador
// const bcrypt = require('bcrypt');

// //router para usuarios
// const adminRouter = express.Router();

// //endpoit de registro
// adminRouter.post('/register-admin', (req, res, next) => {
//     const done = (err, user) => {
//         if(err) {
//             return next(err)
//         }
//         //iniciamos sesion con el user creado
//         //2 argumentos: 1/usuario, 2/callback(si es correcto o hay error de logeo) 2.1/Error
//         req.logIn(
//             user,
//             (err) => {
//                 if(err) {
//                     return next(err);
//                 }
//                 return res.status(201).json(user)
//             }
//         )
//     };
//     //autenticamos al usuario: 1/nombre estrategia 2/done
//     passport.authenticate('registerAdmin', done)(req);
// });

// //endpoint para login
// adminRouter.post('/login-admin', (req, res, next) => {
//     const done = (err, user) => {
//         if(err) {
//             return next(err);
//         }
//         req.logIn(
//             user,
//             (err) => {
//                 if(err) {
//                     return next(err);
//                 }
//                 return res.status(200).json(user);
//             }
//         )
//     }
//     passport.authenticate('loginAdmin', done)(req);
// });

// //endpoint para logout
// adminRouter.post('/logout-admin', (req, res, next) => {
//     //probamos si hay usuario activo
//     if(req.user) {
//         //deslogeo al usuario
//         req.logOut(() => {
//             req.session.destroy(() => {
//             //limpio la cookie
//                 res.clearCookie('connect.sid');
//                 return res.status(200).json('Te has deconectado');
//             });
//         });
//     } else {
//         return res.status(304).json('No hay nadie logeado')
//     }
// });

// //exportamos
// module.exports = adminRouter;