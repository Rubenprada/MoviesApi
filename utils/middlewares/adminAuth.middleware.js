'use strict';

//requerimos manejador de errores
const createError = require('../errors/create-errors.js');

//middleware para roles de admin
const isAunthAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role === "admin") {
        return next();
    } else {
        return next(createError('No tienes permisos', 401))
    }
};

//exportamos
module.exports = isAunthAdmin;